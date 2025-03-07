const categoryModel = require("../models/catergory");

// get categories
const getCategoriesController = async (req, res) => {
  try {
    const getAllCategories = await categoryModel.find({});

    if (getAllCategories.length < 1) {
      return res.status(204).json({ message: "No categories Available" });
    }

    res.status(200).json({ message: "sucess", categories: getAllCategories });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// create categories
const createCategoryController = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Requires data" });
    }

    // isExists
    const isCategoryExists = await categoryModel.findOne({
      category: category,
    });

    if (isCategoryExists) {
      return res.status(400).json({ message: "Already exists" });
    }

    // ready for database
    const newCategory = await new categoryModel({
      category: category,
    }).save();

    res.status(200).json({ message: "Successfully created", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// delete categories
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // isExists
    const isCategoryExists = await categoryModel.findById(id);

    if (!isCategoryExists) {
      return res.status(400).json({ message: "Category dosen't exists" });
    }

    // ready for delete
    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "deleteion successfull", data: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
};
