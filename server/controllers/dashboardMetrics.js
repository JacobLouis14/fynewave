const articleModel = require("../models/article");
const categoryModel = require("../models/catergory");
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

const dashboardCard = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    const publishedArticles = await articleModel.countDocuments({
      status: "published",
    });
    const pendingArticles = await articleModel.countDocuments({
      status: "pending",
    });
    const scheduledArticles = await articleModel.countDocuments({
      status: "scheduled",
    });

    res.status(200).json({
      message: "sucess",
      data: {
        userCount,
        publishedArticles,
        pendingArticles,
        scheduledArticles,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getCategoryMetrics,
  dashboardCard,
};
