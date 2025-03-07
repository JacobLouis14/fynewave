const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const articleModel = require("../models/article");
const { stringSlugify } = require("../utils/slugify");
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
} = require("../utils/aws_s3");

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
      tags,
      author,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      articleContentInstagram,
    } = req.body;
    const { thumbnail, banner, articleContentImage } = req.files;

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
      !thumbnail ||
      !banner
    ) {
      return res.status(400).json({ message: "Incomplete form data" });
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

    // content ready for database
    const newArticle = await new articleModel({
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      tags,
      author,
      thumbnail: thumbnailName,
      banner: bannerName,
      slug,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentImage: articleContentImagePath,
      articleContentInstagram,
    }).save();

    res.status(200).json({ message: "Sucessfully added article", newArticle });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "server Error", error });
  }
};

const getArticleController = async (req, res) => {
  try {
    const { search, page, articlesPerPage } = req.query;

    // infinite scroll config

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $regex: new RegExp(search, "i") } },
      ];
    }

    // article retrivel
    const post = await articleModel
      .find(query, {
        title: 1,
        thumbnail: 1,
        desc: 1,
        author: 1,
        createdAt: 1,
        banner: 1,
        isArtistOfTheWeek: 1,
        isSongOfTheWeek: 1,
        isDjOfTheWeek: 1,
        isLandingCard: 1,
      })
      .sort({ _id: -1 })
      .skip((page - 1) * articlesPerPage)
      .limit(articlesPerPage);

    // image url genarating
    for (let articles of post) {
      if (articles.thumbnail && articles.banner) {
        // thumbnail params
        const thumbnailgetObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: articles.thumbnail,
        };
        const getThumbnailCommand = new GetObjectCommand(
          thumbnailgetObjectParams
        );
        // banner params
        const bannergetObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: articles.banner,
        };
        const getBannerCommand = new GetObjectCommand(bannergetObjectParams);

        const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand);
        const bannerUrl = await getSignedUrl(s3, getBannerCommand);

        articles._doc.thumbnailUrl = thumbnailUrl;
        articles._doc.bannerUrl = bannerUrl;
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

const getArticleByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const isArticleExist = await articleModel.findById(id);

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
    res.status(500).json({ message: "server error", error });
  }
};

const updateArticleController = async (req, res) => {
  try {
    const {
      _id,
      title,
      desc,
      tags,
      author,
      category,
      thumbnailUrl,
      bannerUrl,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      articleContentInstagram,
    } = req.body;

    const { thumbnail, banner, articleContentImage } = req.files;

    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !tags ||
      !author ||
      !category ||
      !(
        (thumbnailUrl && bannerUrl && !thumbnail && !banner) ||
        (!thumbnailUrl && !bannerUrl && thumbnail && banner) ||
        ((thumbnailUrl || bannerUrl) && (thumbnail || banner))
      )
    ) {
      return res.status(400).json({ message: "Incomplete form data" });
    }

    // checking isExist
    const isExist = await articleModel.findById(_id);
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

    // updating database
    const updatedData = await articleModel.findByIdAndUpdate(
      _id,
      {
        title,
        desc,
        tags,
        articleContentOne,
        articleContentTwo,
        articleContentThree,
        author,
        thumbnail: newThumbnailName,
        banner: newBannerName,
        slug: newSlug,
        category,
        songsIframes,
        videoIframes,
        alternativeTitle,
        articleContentInstagram,
        articleContentImage: articleContentImagePath,
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

    const deleteArticle = await articleModel.findByIdAndDelete(id);
    res.status(200).json(deleteArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const latestBlogController = async (req, res) => {
  try {
    const latestArticles = await articleModel.aggregate([
      {
        $sort: { updatedAt: -1 },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          title: 1,
          desc: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
          thumbnail: 1,
          slug: 1,
        },
      },
    ]);

    for (let article of latestArticles) {
      if (article.thumbnail) {
        const imageUrl = await getBucketImageUrl(article.thumbnail);
        article.thumbnailUrl = imageUrl;
      }
    }

    res.status(200).json({ message: "success", latestArticles });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const otherBlogsController = async (req, res) => {
  try {
    const otherBlogsData = await articleModel.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
          thumbnail: 1,
          slug: 1,
        },
      },
    ]);

    for (let article of otherBlogsData) {
      if (article.thumbnail) {
        const imageUrl = await getBucketImageUrl(article.thumbnail);
        article.thumbnailUrl = imageUrl;
      }
    }

    res.status(200).json({ message: "success", otherBlogsData });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getArticleDataBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const isArticleExist = await articleModel.findOne({ slug });

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

      const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand, {
        expiresIn: 3600,
      });
      const bannerUrl = await getSignedUrl(s3, getBannerCommand, {
        expiresIn: 3600,
      });

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

    const { tags, _id: originalArticleId } = isArticleExist;

    const relatedArticles = await articleModel.find(
      {
        _id: { $ne: originalArticleId },
        tags: { $in: tags },
      },
      { title: 1, thumbnail: 1, desc: 1, author: 1, updatedAt: 1, slug: 1 },
      { sort: { updatedAt: -1 }, limit: 4 }
    );

    // image genaration for related articles
    for (const rArticle of relatedArticles) {
      if (rArticle.thumbnail) {
        const thumbnailgetObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: rArticle.thumbnail,
        };
        const getThumbnailCommand = new GetObjectCommand(
          thumbnailgetObjectParams
        );
        const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand, {
          expiresIn: 3600,
        });
        rArticle._doc.thumbnailUrl = thumbnailUrl;
      }
    }

    res.status(200).json({
      message: "success",
      articleDataBySlug: isArticleExist,
      relatedArticles,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const getArticleForSitemapController = async (req, res) => {
  try {
    // article retrivel
    const post = await articleModel.find(
      {},
      { title: 1, createdAt: 1, updatedAt: 1, slug: 1 }
    );

    res.status(200).json({ message: "success", articleData: post });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createArticleController,
  getArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  latestBlogController,
  otherBlogsController,
  getArticleDataBySlugController,
  getArticleForSitemapController,
};
