import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while getting categories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("price", price);

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/create-product",
        formData
      );
      if (data?.success) {
        // Clear the form fields after successful submission
        setPhoto("");
        setName("");
        setDescription("");
        setCategory("");
        setQuantity("");
        setShipping("");
        setPrice("");

        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while creating product!");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>

            <form className="w-75 mb-3" onSubmit={handleCreateProduct}>
              <div className="d-flex flex-column">
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-100 p-2 bg-transparent border-1 mb-3"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="w-100 mb-3 p-2"
                  placeholder="Enter product's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="file"
                  className="w-100 mb-3 p-2"
                  name="photo"
                  accept="image/*"
                  placeholder="Upload an image"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <div className="mb-3">
                  {photo && (
                    <div
                      className="image-container"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        className="w-100 h-100 object-fit-cover"
                        src={URL.createObjectURL(photo)}
                        alt="product img"
                      />
                    </div>
                  )}
                </div>
                <textarea
                  type="text"
                  className="w-100 mb-3 p-2"
                  placeholder="Description about product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  className="w-100 mb-3 p-2"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                />
                <input
                  type="number"
                  className="w-100 mb-3 p-2"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
                <select
                  className="w-100 mb-3 p-2 bg-transparent border-1"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>

                <button type="submit" className="btn btn-primary">
                  CREATE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
