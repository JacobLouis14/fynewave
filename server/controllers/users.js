const articleModel = require("../models/article");
const userModel = require("../models/user");

const allUsersDataHandler = async (req, res) => {
  try {
    // const allUserData = await userModel.find(
    //   {},
    //   { password: 0, createdAt: 0, updatedAt: 0 }
    // );

    const allUserData = await userModel.aggregate([
      {
        $match: {
          role: { $in: [0, 1] },
        },
      },
      {
        $addFields: {
          editAllotedArticle: {
            $map: {
              input: "$editAllotedArticle",
              as: "articleId",
              in: { $toObjectId: "$$articleId" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "articles",
          localField: "editAllotedArticle",
          foreignField: "_id",
          as: "editAllotedArticleDetails",
          pipeline: [
            {
              $project: {
                title: 1,
              },
            },
          ],
        },
      },
    ]);

    // if empty
    if (allUserData.length === 0) {
      return res.status(204).json({ message: "Success", allUserData });
    }

    res.status(200).json({ message: "Success", allUserData });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const suspendUserController = async (req, res) => {
  try {
    const { id } = req.params;

    // check if exists
    const userExists = await userModel.findById(id);
    if (!userExists)
      return res.status(400).json({ messgae: "User not exists" });

    // if exists
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        isSuspended: !userExists.isSuspended,
      },
      { new: true }
    );

    res.status(200).json({ message: "success", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  allow content writter to edit article permission
const allowUserEditPermission = async (req, res) => {
  try {
    const { id } = req.params;

    // check if exists
    const userExists = await userModel.findById(id);
    if (!userExists)
      return res.status(400).json({ messgae: "User not exists" });

    // if exists
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        isEditAllowed: !userExists.isEditAllowed,
      },
      { new: true }
    );

    res.status(200).json({ message: "success", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getArticleAndWriterByEmail = async (req, res) => {
  try {
    const { contentWriterEmail, articleTitle } = req.query;

    let allContentWriterEmail;
    let allArticles;

    if (!contentWriterEmail) allContentWriterEmail = [];
    if (!articleTitle) allArticles = [];

    if (contentWriterEmail) {
      allContentWriterEmail = await userModel.find(
        {
          $and: [
            { role: 1 },
            { email: { $regex: contentWriterEmail, $options: "i" } },
          ],
        },
        { _id: 1, email: 1 }
      );
    }

    if (articleTitle) {
      allArticles = await articleModel
        .find(
          { title: { $regex: articleTitle, $options: "i" } },
          { _id: 1, title: 1 }
        )
        .lean();
    }

    res
      .status(200)
      .json({ message: "success", allContentWriterEmail, allArticles });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// asign article to edit permission
const assignArticleToEdit = async (req, res) => {
  try {
    const { articleId, userId } = req.body;

    const isUserExists = await userModel.findById(userId);
    const isArticleExists = await articleModel.findById(articleId);

    if (!isUserExists || isUserExists.role != 1) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!isArticleExists)
      return res.status(400).json({ message: "Invalid article" });

    await userModel.findByIdAndUpdate(userId, {
      $push: { editAllotedArticle: articleId },
    });

    res
      .status(200)
      .json({ message: "successfully added edit permission to article" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// delete article from edit permission
const deleteArticleFromEditPermission = async (req, res) => {
  try {
    const { articleId, userId } = req.params;

    const isUserExists = await userModel.findById(userId);
    const isArticleExists = await articleModel.findById(articleId);

    if (!isUserExists || isUserExists.role != 1) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!isArticleExists)
      return res.status(400).json({ message: "Invalid article" });

    await userModel.findByIdAndUpdate(userId, {
      $pull: { editAllotedArticle: articleId },
    });

    res
      .status(200)
      .json({ message: "successfully remove edit permission to article" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  allUsersDataHandler,
  suspendUserController,
  allowUserEditPermission,
  getArticleAndWriterByEmail,
  assignArticleToEdit,
  deleteArticleFromEditPermission,
};
