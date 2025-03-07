const articleModel = require("../models/article");
const categoryModel = require("../models/catergory");
const ShowCasesModel = require("../models/showcases");
const userModel = require("../models/user");

const getCategoryMetrics = async (req, res) => {
  try {
    const allCategoryCount = await categoryModel.aggregate([
      {
        $count: "totalCategoryCount",
      },
    ]);
    const allArticleByCategoryCount = await articleModel.aggregate([
      {
        $group: {
          _id: "$category",
          number: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "Success",
      categoryMetrics: {
        totalCategoryCount: allCategoryCount[0]?.totalCategoryCount || 0,
        articleCountByCategory: allArticleByCategoryCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getShowcasesMetrics = async (req, res) => {
  try {
    const allShowCasesMatrics = await ShowCasesModel.aggregate([
      {
        $group: {
          _id: "$title",
          showcasesCount: { $sum: { $size: "$articleIds" } },
        },
      },
    ]);
    res.status(200).json({
      message: "Success",
      allShowCasesMatrics,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getUsersMetrics = async (req, res) => {
  try {
    const allUserMatrics = await userModel.aggregate([
      {
        $group: {
          _id: "$role",
          number: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "Success",
      allUserMatrics,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getCategoryMetrics,
  getShowcasesMetrics,
  getUsersMetrics,
};
