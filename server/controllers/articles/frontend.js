const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const articleModel = require("../../models/article");
const { stringSlugify } = require("../../utils/slugify");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  uploadImagesToS3Bucket,
  getBucketImageUrl,
  uploadImagesToBucket,
} = require("../../utils/aws_s3");
const {
  addArticleScheduleJob,
} = require("../../jobs/article_scheduler/schedulePublish");

// s3 bucket initialization
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
  },
});

// GET ARTICLE
const getArticleFrontendController = async (req, res) => {
  try {
    const { search, page, articlesPerPage } = req.query;

    let query = {
      status: "published",
    };
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    // query making
    let queryToexecute = articleModel
      .find(query, {
        title: 1,
        thumbnail: 1,
        author: 1,
        publishedAt: 1,
        createdAt: 1,
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
      if (articles.thumbnail) {
        // thumbnail params
        const thumbnailgetObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: articles.thumbnail,
        };
        const getThumbnailCommand = new GetObjectCommand(
          thumbnailgetObjectParams
        );

        const thumbnailUrl = await getSignedUrl(s3, getThumbnailCommand);

        articles._doc.thumbnailUrl = thumbnailUrl;
      }
    }

    res.status(200).json({ articles: post });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

// based popularity
const latestBlogController = async (req, res) => {
  try {
    const latestArticles = await articleModel.aggregate([
      {
        $match: {
          status: "published",
        },
      },
      {
        $sort: { views: -1 },
      },
      {
        $limit: 6,
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      {
        $unwind: "$authorInfo",
      },
      {
        $project: {
          title: 1,
          desc: 1,
          createdAt: 1,
          updatedAt: 1,
          thumbnail: 1,
          slug: 1,
          author: {
            _id: "$authorInfo._id",
            name: "$authorInfo.name",
          },
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

// sort based freshness
const otherBlogsController = async (req, res) => {
  try {
    const otherBlogsData = await articleModel.aggregate([
      {
        $match: {
          status: "published",
        },
      },
      {
        $sample: { size: 6 },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      {
        $unwind: "$authorInfo",
      },
      {
        $project: {
          title: 1,
          desc: 1,
          createdAt: 1,
          updatedAt: 1,
          thumbnail: 1,
          slug: 1,
          author: {
            _id: "$authorInfo._id",
            name: "$authorInfo.name",
          },
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

    const isArticleExist = await articleModel.findOneAndUpdate(
      {
        slug,
        status: "published",
      },
      {
        $inc: { views: 1 },
      }
    );

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

    // RELATED ARTICLE DATA FETCHING

    const relatedArticles = await articleModel
      .find(
        {
          _id: { $ne: originalArticleId },
          tags: { $in: tags },
        },
        { title: 1, thumbnail: 1, desc: 1, author: 1, updatedAt: 1, slug: 1 },
        { sort: { updatedAt: -1 }, limit: 4 }
      )
      .populate("author", "name");

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
      { status: "published" },
      { title: 1, createdAt: 1, updatedAt: 1, slug: 1 }
    );

    res.status(200).json({ message: "success", articleData: post });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  latestBlogController,
  otherBlogsController,
  getArticleDataBySlugController,
  getArticleForSitemapController,
  getArticleFrontendController,
};
