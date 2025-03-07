const { default: mongoose } = require("mongoose");
const articleModel = require("../models/article");
const ShowCasesModel = require("../models/showcases");
const { getBucketImageUrl } = require("../utils/aws_s3");

//////////////////////////////////songs of the week

const getAllSongsOfTheWeek = async (req, res) => {
  try {
    const allSongsOfTheWeekIds = await ShowCasesModel.findOne({
      title: "songs-of-the-week",
    });

    const articleData = await articleModel.find(
      {
        _id: { $in: allSongsOfTheWeekIds.articleIds },
      },
      {},
      { sort: { updatedAt: -1 } }
    );

    for (let songsData of articleData) {
      const thumbnail = await getBucketImageUrl(songsData.thumbnail);
      songsData._doc.thumbnailUrl = thumbnail;
    }

    res
      .status(200)
      .json({ message: "success", allSongsOfTheWeek: articleData });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const updateSongsOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne(
      {
        $and: [
          { title: "songs-of-the-week" },
          { articleIds: { $in: [articleId] } },
        ],
      },
      {},
      { upsert: true }
    );
    const isArticleExist = await articleModel.findById(articleId);

    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    if (!isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "songs-of-the-week",
        },
        {
          $push: {
            articleIds: articleId,
          },
        },
        { new: true, upsert: true }
      );
    }
    if (isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "songs-of-the-week",
        },
        {
          $pull: {
            articleIds: articleId,
          },
        },
        { new: true, upsert: true }
      );
    }

    await articleModel.findByIdAndUpdate(articleId, {
      isSongOfTheWeek: !isArticleExist.isSongOfTheWeek,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

const deleteSongOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne({
      $and: [
        { title: "songs-of-the-week" },
        { articleIds: { $in: [articleId] } },
      ],
    });
    const isArticleExist = await articleModel.findById(articleId);

    if (!isExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article don't exists" });
    }
    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    await new ShowCasesModel.findOneAndUpdate(
      {
        title: "songs-of-the-week",
      },
      {
        $pull: {
          articleIds: articleId,
        },
      },
      { new: true }
    );

    await articleModel.findByIdAndUpdate(articleId, {
      isSongOfTheWeek: !isArticleExist.isSongOfTheWeek,
    });

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
    const allArtistOfTheWeekIds = await ShowCasesModel.findOne({
      title: "artists-of-the-week",
    });

    const articleData = await articleModel.find(
      {
        _id: { $in: allArtistOfTheWeekIds.articleIds },
      },
      {},
      { sort: { updatedAt: -1 } }
    );

    for (let songsData of articleData) {
      const thumbnail = await getBucketImageUrl(songsData.thumbnail);
      songsData._doc.thumbnailUrl = thumbnail;
    }

    res
      .status(200)
      .json({ message: "success", allArtistsOfTheWeek: articleData });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const updateArtistOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne(
      {
        $and: [
          { title: "artists-of-the-week" },
          { articleIds: { $in: [articleId] } },
        ],
      },
      {},
      { upsert: true }
    );
    const isArticleExist = await articleModel.findById(articleId);

    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    if (!isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "artists-of-the-week",
        },
        {
          $push: {
            articleIds: articleId,
          },
        },
        { new: true, upsert: true }
      );
    }
    if (isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "artists-of-the-week",
        },
        {
          $pull: {
            articleIds: articleId,
          },
        },
        { new: true, upsert: true }
      );
    }

    await articleModel.findByIdAndUpdate(articleId, {
      isArtistOfTheWeek: !isArticleExist.isArtistOfTheWeek,
    });

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
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne({
      $and: [
        { title: "artists-of-the-week" },
        { articleIds: { $in: [articleId] } },
      ],
    });
    const isArticleExist = await articleModel.findById(articleId);

    if (!isExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article don't exists" });
    }
    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    await new ShowCasesModel.findOneAndUpdate(
      {
        title: "artists-of-the-week",
      },
      {
        $pull: {
          articleIds: articleId,
        },
      },
      { new: true }
    );

    await articleModel.findByIdAndUpdate(articleId, {
      isArtistOfTheWeek: !isArticleExist.isArtistOfTheWeek,
    });

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
    const allDjsOfTheWeekIds = await ShowCasesModel.aggregate([
      {
        $match: {
          title: "djs-of-the-week",
        },
      },
      {
        $unwind: "$articleIds",
      },
      {
        $sort: {
          "articleIds.position": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          articleIds: { $push: "$articleIds" },
        },
      },
    ]);

    const articleData = await articleModel.find(
      {
        _id: {
          $in: allDjsOfTheWeekIds[0].articleIds.map((item) => item.articleId),
        },
      },
      { title: 1, slug: 1, thumbnail: 1, alternativeTitle: 1 }
    );

    if (articleData.length > 0) {
      for (let songsData of articleData) {
        if (songsData.thumbnail) {
          const thumbnail = await getBucketImageUrl(songsData.thumbnail);
          songsData._doc.thumbnailUrl = thumbnail;
        }
      }
    }

    res
      .status(200)
      .json({ message: "success", allDjsOfTheWeek: articleData.reverse() });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const updateDjsOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId, djPosition } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne(
      {
        title: "djs-of-the-week",
        "articleIds.articleId": articleId,
      },
      {},
      { upsert: true }
    );
    const isArticleExist = await articleModel.findById(articleId);

    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    if (!isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "djs-of-the-week",
        },
        {
          $push: {
            articleIds: { articleId: articleId, position: djPosition },
          },
        },
        { new: true, upsert: true }
      );
    }
    if (isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "djs-of-the-week",
        },
        {
          $pull: {
            articleIds: { articleId: articleId },
          },
        },
        { new: true, upsert: true }
      );
    }

    await articleModel.findByIdAndUpdate(articleId, {
      isDjOfTheWeek: !isArticleExist.isDjOfTheWeek,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "server error", error });
  }
};

const deleteDjOfTheWeekController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne({
      $and: [
        { title: "djs-of-the-week" },
        { articleIds: { $in: [articleId] } },
      ],
    });
    const isArticleExist = await articleModel.findById(articleId);

    if (!isExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article don't exists" });
    }
    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    await new ShowCasesModel.findOneAndUpdate(
      {
        title: "djs-of-the-week",
      },
      {
        $pull: {
          articleIds: articleId,
        },
      },
      { new: true }
    );

    await articleModel.findByIdAndUpdate(articleId, {
      isDjOfTheWeek: !isArticleExist.isDjOfTheWeek,
    });

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
    const articleData = await ShowCasesModel.aggregate([
      {
        $match: { title: "landing-card" },
      },
      {
        $unwind: "$articleIds",
      },
      {
        $addFields: {
          "articleIds.articleId": { $toObjectId: "$articleIds.articleId" },
        },
      },
      {
        $lookup: {
          from: "articles",
          localField: "articleIds.articleId",
          foreignField: "_id",
          as: "articleData",
          pipeline: [
            {
              $project: {
                _id: 1,
                thumbnail: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $set: {
          "articleIds.articleData": { $arrayElemAt: ["$articleData", 0] },
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          articleIds: { $push: "$articleIds" },
        },
      },
    ]);

    if (articleData.length > 0) {
      for (let songsData of articleData[0].articleIds) {
        if (songsData.articleData.thumbnail) {
          const thumbnail = await getBucketImageUrl(
            songsData.articleData.thumbnail
          );

          songsData.articleData.thumbnailUrl = thumbnail;
        }
      }
    }
    const allLandingCards = articleData[0];
    res
      .status(200)
      .json({ message: "success", allLandingCards: { ...allLandingCards } });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error });
  }
};

const updateLandingCardsController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { articleId, title, categoryTitle } = req.body;

    //  validation
    const isExists = await ShowCasesModel.findOne(
      {
        title: "landing-card",
        "articleIds.articleId": articleId,
      },
      {},
      { upsert: true }
    );
    const isArticleExist = await articleModel.findById(articleId);

    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    if (!isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "landing-card",
        },
        {
          $push: {
            articleIds: {
              articleId: articleId,
              cardTitle: title,
              categoryTitle: categoryTitle,
            },
          },
        },
        { new: true, upsert: true }
      );
    }
    if (isExists) {
      await ShowCasesModel.findOneAndUpdate(
        {
          title: "landing-card",
        },
        {
          $pull: {
            articleIds: { articleId: articleId },
          },
        },
        { new: true, upsert: true }
      );
    }

    await articleModel.findByIdAndUpdate(articleId, {
      isLandingCard: !isArticleExist.isLandingCard,
    });

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
    const { articleId } = req.params;

    //  validation
    const isExists = await ShowCasesModel.findOne({
      $and: [{ title: "landing-card" }, { articleIds: { $in: [articleId] } }],
    });
    const isArticleExist = await articleModel.findById(articleId);

    if (!isExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article don't exists" });
    }
    if (!isArticleExist) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Article does not exists" });
    }

    await new ShowCasesModel.findOneAndUpdate(
      {
        title: "landing-card",
      },
      {
        $pull: {
          articleIds: articleId,
        },
      },
      { new: true }
    );

    await articleModel.findByIdAndUpdate(articleId, {
      isLandingCard: !isArticleExist.isLandingCard,
    });

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
  updateSongsOfTheWeekController,
  deleteSongOfTheWeekController,
  getAllArtistOfTheWeek,
  updateArtistOfTheWeekController,
  deleteArtistOfTheWeekController,
  getAllDjsOfTheWeek,
  updateDjsOfTheWeekController,
  deleteDjOfTheWeekController,
  getAllLandingCards,
  updateLandingCardsController,
  deleteLandingCardsController,
};
