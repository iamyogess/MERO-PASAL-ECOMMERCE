// import { ProductModel } from "../models/product.model.js";
// import fs from "fs";
// import slugify from "slugify";

// export const createProductController = async (req, res) => {
//   try {
//     const { name, slug, description, price, category, quantity, shipping } =
//       // req.fields;
//       req.body;
//     // const { photo } = req.files;

//     if (!name) {
//       return res.status(500).json({ error: "name is required!" });
//     }
//     if (!description) {
//       return res.status(500).json({ error: "description is required!" });
//     }
//     if (!price) {
//       return res.status(500).json({ error: "price is required!" });
//     }
//     if (!category) {
//       return res.status(500).json({ error: "category is required!" });
//     }
//     if (!quantity) {
//       return res.status(500).json({ error: "quantity is required!" });
//     }
//     // if (!photo) {
//     //     return res.status(500).json({ error: "photo is required!" });
//     // }
//     // if (photo.size > 1000000) {
//     //     return res.status(500).json({ error: "photo should be less than 1MB!" });
//     // }

//     // if (photo) {
//     //     products.photo.data = fs.readFileSync(photo.path);
//     //     products.photo.contentType = photo.type;
//     // }

//     const products = new ProductModel({ ...req.body, slug: slugify(name) });
//     await products.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Product created!", products });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error in creating product!", error });
//   }
// };

import { ProductModel } from "../models/product.model.js";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    // Destructure required fields from req.body directly
    const { name, description, price, category, quantity, shipping } = req.body;

    // Check if required fields are present
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Additional validation for fields can be added here if necessary

    // Generate slug from name using slugify
    const slug = slugify(name);

    // Create a new product instance
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      quantity,
      slug, // Add slug to the product
    });

    // Save the product to the database
    await product.save();

    // Respond with success message and the created product
    return res
      .status(201)
      .json({ success: true, message: "Product created!", product });
  } catch (error) {
    console.error("Error in creating product:", error);
    // If an error occurs, respond with an error message
    return res.status(500).json({
      success: false,
      message: "Error in creating product!",
      error: error.message,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Products",
      total_count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting products!",
      error: error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res
      .status(200)
      .json({ success: true, message: "Single product fetched!", product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res
        .status(200)
        .json({ success: true, productPhoto: product.photo.data });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while getting photo!", error });
  }
};
