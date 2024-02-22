import { ProductModel } from "../models/product.model.js";
import fs from "fs";
import slugify from "slugify";

// export const createProductController = async (req, res) => {
//   try {
//     const { name, slug, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.files;

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
//     if (!photo) {
//       return res.status(500).json({ error: "photo is required!" });
//     }
//     if (photo.size > 1000000) {
//       return res.status(500).json({ error: "photo should be less than 1MB!" });
//     }

//     const products = new ProductModel({ ...req.fields, slug: slugify(name) });

//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }

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



export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).json({ error: "Photo size should be less than 1MB" });
    }

    // Creating product
    const newProduct = new ProductModel({
      name,
      description,
      price,
      category,
      quantity,
      slug: slugify(name)
    });

    // Handling photo upload
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Error in creating product",
    });
  }
};



// get products
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

//get single product
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

//photo
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

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting product!",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      // req.fields;
      req.body;
    // const { photo } = req.files;

    if (!name) {
      return res.status(500).json({ error: "name is required!" });
    }
    if (!description) {
      return res.status(500).json({ error: "description is required!" });
    }
    if (!price) {
      return res.status(500).json({ error: "price is required!" });
    }
    if (!category) {
      return res.status(500).json({ error: "category is required!" });
    }
    if (!quantity) {
      return res.status(500).json({ error: "quantity is required!" });
    }
    if (!photo) {
      return res.status(500).json({ error: "photo is required!" });
    }
    if (photo.size > 1000000) {
      return res.status(500).json({ error: "photo should be less than 1MB!" });
    }

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    const products = new ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
    await products.save();
    res
      .status(200)
      .json({ success: true, message: "Product updated!", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in updating product!", error });
  }
};
