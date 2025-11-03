const { default: mongoose } = require("mongoose");
const articleModel = require("../models/article");
const { getBucketImageUrl } = require("../utils/aws_s3");
const FeaturedSongsModel = require("../models/featuredSongs");
const CheckThemOutModel = require("../models/checkThemOut");
const OnSpotLightModel = require("../models/onSpotLight");
const LandingModel = require("../models/landing");

//////////////////////////////////songs of the week

const getAllSongsOfTheWeek = async (req, res) => {
  try {
    const articleData = await FeaturedSongsModel.aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "article_id",
          foreignField: "_id",
          as: "articleData",
          pipeline: [
            {
              $project: {
                alternativeTitle: 1,
                createdAt: 1,
                thumbnail: 1,
                slug: 1,
                category: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$articleData",
      },
    ]);

    for (let songsData of articleData) {
      const thumbnail = await getBucketImageUrl(
        songsData.articleData.thumbnail
      );
      songsData.articleData.thumbnailUrl = thumbnail;
    }

    res
      .status(200)
      .json({ message: "success", allSongsOfTheWeek: articleData });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const createSongsOfTheWeekController = async (req, res) => {
  try {
    const { articleId } = req.params;

    const isArticleExistInFeaturedSongs = await FeaturedSongsModel.findOne({
      article_id: articleId,
    });

    if (isArticleExistInFeaturedSongs) {
      return res.status(400).json({ message: "already exists" });
    }

    const isArticleExists = await articleModel.exists({ _id: articleId });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateFeaturedSongs = FeaturedSongsModel.create({
      article_id: articleId,
    });
    const articleUpdate = articleModel.findByIdAndUpdate(articleId, {
      isSongOfTheWeek: true,
    });
    await Promise.all([updateFeaturedSongs, articleUpdate]);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const deleteSongOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    const isExists = await FeaturedSongsModel.exists({ article_id: id });

    if (!isExists) {
      return res.status(400).json({ message: "Article not in featured songs" });
    }

    const isArticleExists = await articleModel.exists({ _id: id });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateFeaturedSongs = FeaturedSongsModel.findByIdAndDelete(
      isExists._id
    );
    const articleUpdate = articleModel.findByIdAndUpdate(id, {
      isSongOfTheWeek: false,
    });
    await Promise.all([updateFeaturedSongs, articleUpdate]);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

//////////////////////////////////artist of the week

const getAllArtistOfTheWeek = async (req, res) => {
  try {
    const articleData = await CheckThemOutModel.aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "article_id",
          foreignField: "_id",
          as: "articleData",
          pipeline: [
            {
              $project: {
                alternativeTitle: 1,
                createdAt: 1,
                thumbnail: 1,
                slug: 1,
                category: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$articleData",
      },
    ]);

    for (let songsData of articleData) {
      const thumbnail = await getBucketImageUrl(
        songsData.articleData.thumbnail
      );
      songsData.articleData.thumbnailUrl = thumbnail;
    }

    res
      .status(200)
      .json({ message: "success", allArtistsOfTheWeek: articleData });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const createArtistOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId } = req.params;

    const isArticleExistInCheckThemOut = await CheckThemOutModel.exists({
      article_id: articleId,
    });

    if (isArticleExistInCheckThemOut) {
      return res.status(400).json({ message: "already exists" });
    }

    const isArticleExists = await articleModel.exists({ _id: articleId });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateCheckThemOut = CheckThemOutModel.create({
      article_id: articleId,
    });
    const articleUpdate = articleModel.findByIdAndUpdate(articleId, {
      isArtistOfTheWeek: true,
    });
    await Promise.all([updateCheckThemOut, articleUpdate]);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

const deleteArtistOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    const isExists = await CheckThemOutModel.exists({ article_id: id });

    if (!isExists) {
      return res.status(400).json({ message: "Article not in Check them out" });
    }

    const isArticleExists = await articleModel.exists({ _id: id });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateCheckThemOut = CheckThemOutModel.findByIdAndDelete(
      isExists._id
    );
    const articleUpdate = articleModel.findByIdAndUpdate(id, {
      isArtistOfTheWeek: false,
    });
    await Promise.all([updateCheckThemOut, articleUpdate]);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

//////////////////////////////////Djs of the week

const getAllDjsOfTheWeek = async (req, res) => {
  try {
    const articleData = await OnSpotLightModel.aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "article_id",
          foreignField: "_id",
          as: "articleData",
          pipeline: [
            {
              $project: {
                alternativeTitle: 1,
                createdAt: 1,
                thumbnail: 1,
                slug: 1,
                category: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$articleData",
      },
    ]);

    if (articleData.length > 0) {
      for (let songsData of articleData) {
        if (songsData.articleData.thumbnail) {
          const thumbnail = await getBucketImageUrl(
            songsData.articleData.thumbnail
          );
          songsData.articleData.thumbnailUrl = thumbnail;
        }
      }
    }
    console.log(articleData);

    res
      .status(200)
      .json({ message: "success", allDjsOfTheWeek: articleData.reverse() });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const createDjsOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId, djPosition } = req.params;

    const spotLightData = await OnSpotLightModel.find();

    if (spotLightData.length >= 3) {
      return res
        .status(400)
        .json({ message: "Maximum 3 article should present" });
    }

    for (const articleIdInSpotLight of spotLightData) {
      if (articleId === articleIdInSpotLight.article_id) {
        return res.status(400).json({ message: "already exists" });
      }
    }

    const isArticleExists = await articleModel.exists({ _id: articleId });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateSpotLight = OnSpotLightModel.create({
      article_id: articleId,
      position: djPosition,
    });
    const articleUpdate = articleModel.findByIdAndUpdate(articleId, {
      isDjOfTheWeek: true,
    });
    await Promise.all([updateSpotLight, articleUpdate]);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const deleteDjOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    const isExists = await OnSpotLightModel.exists({ article_id: id });

    if (!isExists) {
      return res.status(400).json({ message: "Article not in Spot light" });
    }

    const isArticleExists = await articleModel.exists({ _id: id });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateSpotLight = OnSpotLightModel.findByIdAndDelete(isExists._id);
    const articleUpdate = articleModel.findByIdAndUpdate(id, {
      isDjOfTheWeek: false,
    });
    await Promise.all([updateSpotLight, articleUpdate]);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

////////////////////////////////////////for landing page
const getAllLandingCards = async (req, res) => {
  try {
    const articleData = await LandingModel.aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "article_id",
          foreignField: "_id",
          as: "articleData",
          pipeline: [
            {
              $project: {
                title: 1,
                createdAt: 1,
                thumbnail: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$articleData",
      },
    ]);

    if (articleData.length > 0) {
      for (let songsData of articleData) {
        if (songsData.articleData.thumbnail) {
          const thumbnail = await getBucketImageUrl(
            songsData.articleData.thumbnail
          );

          songsData.articleData.thumbnailUrl = thumbnail;
        }
      }
    }

    res.status(200).json({ message: "success", allLandingCards: articleData });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const createLandingCardsController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId, title, categoryTitle } = req.body;

    const isArticleExistInLandingCard = await LandingModel.exists({
      article_id: articleId,
    });

    if (isArticleExistInLandingCard) {
      return res.status(400).json({ message: "already exists" });
    }

    const isArticleExists = await articleModel.exists({ _id: articleId });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateLandingCard = LandingModel.create({
      article_id: articleId,
      cardTitle: title,
      categoryTitle,
    });
    const articleUpdate = articleModel.findByIdAndUpdate(articleId, {
      isLandingCard: true,
    });
    await Promise.all([updateLandingCard, articleUpdate]);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

const deleteLandingCardsController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    const isExists = await LandingModel.exists({ article_id: id });

    if (!isExists) {
      return res.status(400).json({ message: "Article not in Landing Cards" });
    }

    const isArticleExists = await articleModel.exists({ _id: id });

    if (!isArticleExists) {
      return res.status(400).json({ message: "Article not exists" });
    }

    const updateLandingCards = LandingModel.findByIdAndDelete(isExists._id);
    const articleUpdate = articleModel.findByIdAndUpdate(id, {
      isLandingCard: false,
    });
    await Promise.all([updateLandingCards, articleUpdate]);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  getAllSongsOfTheWeek,
  createSongsOfTheWeekController,
  deleteSongOfTheWeekController,
  getAllArtistOfTheWeek,
  createArtistOfTheWeekController,
  deleteArtistOfTheWeekController,
  getAllDjsOfTheWeek,
  createDjsOfTheWeekController,
  deleteDjOfTheWeekController,
  getAllLandingCards,
  createLandingCardsController,
  deleteLandingCardsController,
};
