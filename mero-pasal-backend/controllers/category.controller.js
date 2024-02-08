import CategoryModel from "../models/category.model.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Category is required!" });
    }
    const existingCategory = await CategoryModel.findOne({ name: name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: true, message: "Category already exists" });
    }
    const newCategory = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).json({
      success: true,
      message: "Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Error in category!" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Validate input
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name field is required." });
    }

    // Update category
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated!",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error while updating category:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating category.",
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    if (!category) {
      return res
        .status(404)
        .json({ success: true, message: "No category found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Categories found!", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting category!",
      error,
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const singleCategory = await CategoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).json({
      success: true,
      message: "Get single category successfull!",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting single category!",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Category deleted!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting category!", error });
  }
};
