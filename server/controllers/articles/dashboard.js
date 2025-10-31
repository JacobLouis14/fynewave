const {
  addArticleScheduleJob,
  deleteScheduledArticle,
} = require("../../jobs/article_scheduler/schedulePublish");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const articleModel = require("../../models/article");
const { stringSlugify } = require("../../utils/slugify");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  uploadImagesToS3Bucket,
  copyFileInAws,
  uploadThumbnailToBucket,
  uploadBannerToBucket,
  deleteImagesFromS3Bucket,
  deleteThumbnailFromBucket,
  deleteBannerFromBucket,
  getBucketImageUrl,
  uploadImagesToBucket,
  deleteImageFromBucket,
} = require("../../utils/aws_s3");
const {
  addArticleToDelete,
  cancelArticleDeletion,
} = require("../../jobs/article_delete/deleteArticleJob");
const CheckThemOutModel = require("../../models/checkThemOut");
const FeaturedSongsModel = require("../../models/featuredSongs");
const OnSpotLightModel = require("../../models/onSpotLight");
const LandingModel = require("../../models/landing");

// s3 bucket initialization
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
  },
});

const createArticleController = async (req, res) => {
  try {
    const {
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      tags,
      author,
      category,
      status,
      publishedAt,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentInstagram,
      group,
      scheduledDate,
    } = req.body;
    const { thumbnail, banner, articleContentImage } = req.files;

    const { userId, userRole } = req.user;

    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !tags ||
      !author ||
      !thumbnail ||
      !banner ||
      !category ||
      !publishedAt ||
      !status ||
      !group
    ) {
      return res.status(400).json({ message: "Incomplete form data" });
    }

    // if status schedule
    if (status === "scheduled" && !scheduledDate) {
      return res.status(400).json({ message: "schedule date required" });
    }

    // checking isExist
    const isExist = await articleModel.findOne({
      title: {
        $regex: new RegExp(`^${title.toLowerCase()}`, "i"),
      },
    });
    if (isExist) {
      return res.status(400).json({ message: "allready exist" });
    }

    // images uploading to s3

    const slug = stringSlugify(title);

    const { bannerName, thumbnailName } = await uploadImagesToS3Bucket(
      slug,
      thumbnail,
      banner
    );

    // for article content image
    let articleContentImagePath;
    if (articleContentImage) {
      articleContentImagePath = await uploadImagesToBucket(
        `articles/${slug}/${slug}-articleContentImage`,
        articleContentImage
      );
    }

    // scheduling
    let scheduleJobId;
    if (status === "scheduled") {
      scheduleJobId = await addArticleScheduleJob(
        newArticle._id,
        scheduledDate
      );
    }

    // content ready for database
    const newArticle = await new articleModel({
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      tags,
      author: author,
      thumbnail: thumbnailName,
      banner: bannerName,
      slug,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentImage: articleContentImagePath,
      articleContentInstagram,
      reviewedBy: userId,
      publishedAt: status === "published" ? publishedAt : null,
      status: status,
      group,
      scheduleJobId: status === "scheduled" ? scheduleJobId.id : null,
      scheduledDate: scheduledDate,
    }).save();

    res.status(200).json({ message: "Sucessfully added article", newArticle });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "server Error", error });
  }
};

const getArticleController = async (req, res) => {
  try {
    const { search, page, articlesPerPage, status } = req.query;
    const { userId, userRole } = req.user;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
      ];
    }
    if (status) {
      query = {
        ...query,
        status: status.toLowerCase(),
      };
    } else {
      query = {
        ...query,
        status: "published",
      };
    }

    // user based artcles
    if (userRole != "super_admin" && userRole != "admin") {
      query = {
        ...query,
        author: userId,
      };
    } else {
      if (status === "draft") {
        query = {
          ...query,
          author: userId,
        };
      }
    }

    // query making
    let queryToexecute = articleModel
      .find(query, {
        title: 1,
        thumbnail: 1,
        author: 1,
        isArtistOfTheWeek: 1,
        isDjOfTheWeek: 1,
        isLandingCard: 1,
        isSongOfTheWeek: 1,
        scheduledDate: 1,
        publishedAt: 1,
        createdAt: 1,
        deleteAt: 1,
      })
      .populate("author", "name")
      .sort({ _id: -1 });

    if (page && articlesPerPage) {
      queryToexecute = queryToexecute
        .skip((page - 1) * articlesPerPage)
        .limit(articlesPerPage);
    }

    // article retrivel
    const post = await queryToexecute.exec();

    // image url genarating
    for (let articles of post) {
      if (articles.thumbnail || articles.banner) {
        // thumbnail params
        const thumbnailgetObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: articles.thumbnail,
        };
        const getThumbnailCommand = new GetObjectCommand(
          thumbnailgetObjectParams
        );
        // banner params
        // const bannergetObjectParams = {
        //   Bucket: process.env.BUCKET_NAME,
        //   Key: articles.banner,
        // };
        // const getBannerCommand = new GetObjectCommand(bannergetObjectParams);

        const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand);
        // const bannerUrl = await getSignedUrl(s3, getBannerCommand);

        articles._doc.thumbnailUrl = thumbnailUrl;
        // articles._doc.bannerUrl = bannerUrl;
      }
    }

    res.status(200).json({ articles: post });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

const getArticleByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const isArticleExist = await articleModel
      .findById(id)
      .populate("author", "name");

    if (!isArticleExist) {
      return res.status(400).json({ message: "No article exists" });
    }

    // image url genarating
    if (isArticleExist.thumbnail && isArticleExist.banner) {
      // thumbnail params
      const thumbnailgetObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: isArticleExist.thumbnail,
      };
      const getThumbnailCommand = new GetObjectCommand(
        thumbnailgetObjectParams
      );
      // banner params
      const bannergetObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: isArticleExist.banner,
      };
      const getBannerCommand = new GetObjectCommand(bannergetObjectParams);

      const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand);
      const bannerUrl = await getSignedUrl(s3, getBannerCommand);

      isArticleExist._doc.thumbnailUrl = thumbnailUrl;
      isArticleExist._doc.bannerUrl = bannerUrl;
    }

    // article content image signed url generator
    if (isArticleExist.articleContentImage) {
      const articleContentImagegetObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: isArticleExist.articleContentImage,
      };
      const getArticleContentImageCommand = new GetObjectCommand(
        articleContentImagegetObjectParams
      );
      const articleContentImageUrl = await getSignedUrl(
        s3,
        getArticleContentImageCommand
      );
      isArticleExist._doc.articleContentImageUrl = articleContentImageUrl;
    }

    res.status(200).json(isArticleExist);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const updateArticleController = async (req, res) => {
  try {
    const { articleId } = req.params;
    const {
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      tags,
      category,
      thumbnailUrl,
      bannerUrl,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentInstagram,
      status,
      reviewedBy,
      publishedAt,
      group,
      scheduledDate,
    } = req.body;

    const { thumbnail, banner, articleContentImage } = req.files;

    if (!articleId) {
      return res.status(400).json({ message: "bad request" });
    }

    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !tags ||
      !category ||
      !status ||
      !group ||
      !(
        (thumbnailUrl && bannerUrl && !thumbnail && !banner) ||
        (!thumbnailUrl && !bannerUrl && thumbnail && banner) ||
        ((thumbnailUrl || bannerUrl) && (thumbnail || banner))
      )
    ) {
      return res.status(400).json({ message: "Incomplete form data" });
    }

    // if status schedule
    if (status === "scheduled" && !scheduledDate) {
      return res.status(400).json({ message: "schedule date required" });
    }

    // checking isExist
    const isExist = await articleModel.findById(articleId);
    if (!isExist) {
      return res.status(400).json({ message: "article not found" });
    }

    // images uploading to s3
    const newSlug = stringSlugify(title);

    let newBannerName;
    let newThumbnailName;
    let articleContentImagePath;

    if (isExist.slug === newSlug) {
      if (thumbnail) {
        const { thumbnailName } = await uploadThumbnailToBucket(
          newSlug,
          thumbnail
        );
        newThumbnailName = thumbnailName;
      }
      if (banner) {
        const { bannerName } = await uploadBannerToBucket(newSlug, banner);
        newBannerName = bannerName;
      }
      if (articleContentImage) {
        const imagePathname = await uploadImagesToBucket(
          `articles/${newSlug}/${newSlug}-articleContentImage`,
          articleContentImage
        );
        articleContentImagePath = imagePathname;
      }
    } else {
      if (thumbnailUrl) {
        await copyFileInAws(
          thumbnailUrl,
          `articles/${newSlug}/${newSlug}-thumbnail`
        );
        await deleteThumbnailFromBucket(thumbnailUrl);
        newThumbnailName = `articles/${newSlug}/${newSlug}-thumbnail`;
      }
      if (bannerUrl) {
        await copyFileInAws(bannerUrl, `articles/${newSlug}/${newSlug}-banner`);
        await deleteBannerFromBucket(bannerUrl);
        newBannerName = `articles/${newSlug}/${newSlug}-banner`;
      }
      if (thumbnail) {
        const { thumbnailName } = await uploadThumbnailToBucket(
          newSlug,
          thumbnail
        );
        await deleteThumbnailFromBucket(
          `articles/${isExist.slug}/${isExist.slug}-thumbnail`
        );
        newThumbnailName = thumbnailName;
      }
      if (banner) {
        const { bannerName } = await uploadBannerToBucket(newSlug, banner);
        await deleteBannerFromBucket(
          `articles/${isExist.slug}/${isExist.slug}-banner`
        );
        newBannerName = bannerName;
      }
      if (articleContentImage) {
        const imagePathname = await uploadImagesToBucket(
          `articles/${newSlug}/${newSlug}-articleContentImage`,
          articleContentImage
        );
        await deleteImageFromBucket(
          `articles/${isExist.slug}/${isExist.slug}-articleContentImage`
        );
        articleContentImagePath = imagePathname;
      }
    }

    // scheduling
    let scheduleJobId;
    if (status === "scheduled") {
      scheduleJobId = await addArticleScheduleJob(articleId, scheduledDate);
    }

    // updating database
    const updatedData = await articleModel.findByIdAndUpdate(
      articleId,
      {
        title,
        desc,
        tags,
        articleContentOne,
        articleContentTwo,
        articleContentThree,
        thumbnail: newThumbnailName,
        banner: newBannerName,
        slug: newSlug,
        category,
        songsIframes,
        videoIframes,
        alternativeTitle,
        articleContentInstagram,
        articleContentImage: articleContentImagePath,
        reviewedBy,
        status,
        publishedAt: status === "published" ? publishedAt : null,
        group,
        scheduleJobId: status === "scheduled" ? scheduleJobId.id : null,
        scheduledDate: scheduledDate,
      },
      { new: true }
    );

    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteArticleController = async (req, res) => {
  try {
    const { id } = req.params;

    // checking isExist
    const isExist = await articleModel.findById(id);
    if (!isExist) {
      return res.status(400).json({ message: "article not found" });
    }

    // delete image from s3
    await deleteImagesFromS3Bucket(isExist.thumbnail, isExist.banner);
    if (isExist.articleContentImage) {
      await deleteImageFromBucket(isExist.articleContentImage);
    }

    const deleteArticle = await articleModel.findByIdAndDelete(id);
    res.status(200).json(deleteArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const softDeleteArticleController = async (req, res) => {
  try {
    const { id } = req.params;

    // checking isExist
    const isExist = await articleModel.findById(id);
    if (!isExist) {
      return res.status(400).json({ message: "article not found" });
    }

    let updatedFields = {
      status: "deleted",
    };

    // IF SCHEDULED
    if (isExist.status === "scheduled") {
      await deleteScheduledArticle(isExist.scheduleJobId);
      updatedFields = {
        ...updatedFields,
        scheduledDate: null,
        scheduleJobId: null,
      };
    }
    // release from showcases
    if (isExist.isArtistOfTheWeek) {
      updatedFields.isArtistOfTheWeek = false;
      await CheckThemOutModel.findOneAndDelete({ article_id: isExist._id });
    }

    if (isExist.isSongOfTheWeek) {
      updatedFields.isSongOfTheWeek = false;
      await FeaturedSongsModel.findOneAndDelete({ article_id: isExist._id });
    }

    if (isExist.isDjOfTheWeek) {
      updatedFields.isDjOfTheWeek = false;
      await OnSpotLightModel.findOneAndDelete({ article_id: isExist._id });
    }

    if (isExist.isLandingCard) {
      updatedFields.isLandingCard = false;
      await LandingModel.findOneAndDelete({ article_id: isExist._id });
    }

    const deleteDelay = new Date();
    deleteDelay.setDate(deleteDelay.getDate() + 30);
    // deleteDelay.setMinutes(deleteDelay.getMinutes() + 1);

    const deleteQueueResponse = await addArticleToDelete(
      id,
      deleteDelay.toISOString()
    );

    updatedFields = {
      ...updatedFields,
      deleteScheduleJobId: deleteQueueResponse.id,
      deleteAt: deleteDelay.toISOString(),
    };

    const deleteArticle = await articleModel.findByIdAndUpdate(id, {
      $set: updatedFields,
    });
    res.status(200).json({ message: "added to recyclebin" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

const restoreSoftDeleted = async (req, res) => {
  try {
    const { id } = req.params;

    // checking isExist
    const isExist = await articleModel.findById(id);
    if (!isExist || isExist.status != "deleted") {
      return res.status(400).json({ message: "article not found" });
    }

    await cancelArticleDeletion(isExist.deleteScheduleJobId);

    const deleteArticle = await articleModel.findByIdAndUpdate(id, {
      status: "draft",
      deleteAt: null,
      deleteScheduleJobId: null,
    });
    res.status(200).json({ message: "sucessfully restored" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updateArticleScheduledTime = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { scheduledDate } = req.body;

    if (!articleId || !scheduledDate)
      return res.status(400).json({ message: "Bad request" });

    const articleData = await articleModel.findOne(
      {
        _id: articleId,
        status: "scheduled",
      },
      {
        scheduleJobId: 1,
      }
    );

    if (!articleData)
      return res.status(400).json({ message: "Article not found" });

    await deleteScheduledArticle(articleData.scheduleJobId);
    const newJobId = await addArticleScheduleJob(
      articleData._id,
      scheduledDate
    );

    await articleModel.findByIdAndUpdate(articleData._id, {
      scheduleJobId: newJobId.id,
      scheduledDate: scheduledDate,
    });

    res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

// save as draft controller
const saveAsDraftController = async (req, res) => {
  try {
    const {
      title,
      desc,
      tags,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      articleContentInstagram,
      group,
    } = req.body;

    const { thumbnail, banner, articleContentImage } = req.files;
    const { userId } = req.user;

    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !group
    ) {
      return res
        .status(400)
        .json({ message: "Title, desc, article content 1,2,3 are required" });
    }

    // checking isExist
    const isExist = await articleModel.findOne({
      title: {
        $regex: new RegExp(`^${title.toLowerCase()}`, "i"),
      },
    });
    if (isExist) {
      return res.status(400).json({ message: "allready exist" });
    }

    // check user exceeds draft limit
    const draftCount = await articleModel.countDocuments({
      author: userId,
      status: "draft",
    });

    if (draftCount >= 5) {
      return res.status(400).json({ message: "Draft limit reached" });
    }

    // images uploading to s3

    const slug = stringSlugify(title);

    let bannerName = null;
    let thumbnailName = null;

    if (thumbnail || banner) {
      const uploadResult = await uploadImagesToS3Bucket(
        slug,
        thumbnail,
        banner
      );
      bannerName = uploadResult.bannerName;
      thumbnailName = uploadResult.thumbnailName;
    }

    // for article content image
    let articleContentImagePath = null;
    if (articleContentImage) {
      articleContentImagePath = await uploadImagesToBucket(
        `articles/${slug}/${slug}-articleContentImage`,
        articleContentImage
      );
    }

    // content ready for database
    const newArticle = await new articleModel({
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      tags,
      author: userId,
      thumbnail: thumbnailName,
      banner: bannerName,
      slug,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentImage: articleContentImagePath,
      articleContentInstagram,
      status: "draft",
      group,
    }).save();

    res.status(200).json({ message: "Sucessfully added article", newArticle });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error" });
  }
};

// update draft to published
const updateDraftToPublished = async (req, res) => {
  try {
    const { articleId } = req.params;

    if (!articleId) return res.status(400).json({ message: "bad request" });

    await articleModel.findByIdAndUpdate(articleId, {
      status: "published",
    });

    res.status(200).json({ message: "update sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// review content writer article
const reviewContentWriterArticle = async (req, res) => {
  try {
    const { articleId, isApproved, rejectedReason, scheduledPublishedAt } =
      req.body;
    const { userId } = req.user;

    if (!articleId) {
      return res.status(400).json({ message: "bad request" });
    }

    const status = scheduledPublishedAt ? "scheduled" : "published";
    const publishedAt = scheduledPublishedAt ? null : new Date();

    if (isApproved === true) {
      await articleModel.findByIdAndUpdate(articleId, {
        reviewedBy: userId,
        publishedAt,
      });
    } else {
      await articleModel.findByIdAndUpdate(articleId, {
        reviewedBy: userId,
        rejectedReason: rejectedReason,
        publishedAt,
      });
    }

    // scheduling job
    if (status === "scheduled") {
      await addArticleScheduleJob(articleId, scheduledPublishedAt);
    }

    res.status(200).json({ message: "article update success" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createArticleController,
  getArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  softDeleteArticleController,
  restoreSoftDeleted,
  updateArticleScheduledTime,
  saveAsDraftController,
  updateDraftToPublished,
  reviewContentWriterArticle,
};
