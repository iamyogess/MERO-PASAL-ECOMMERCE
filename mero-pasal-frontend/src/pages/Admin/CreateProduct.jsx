import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");

  // get all cats 
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'><AdminMenu /></div>
          <div className='col-md-9'>
            <h1>Create Product</h1>

            <form action="" className='w-75 mb-3'>
              <div className="d-flex flex-column">
                <select value={category} onChange={handleCategoryChange} className='w-100 p-2 bg-transparent border-1 mb-3'>
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input type="text" className="w-100 mb-3 p-2" placeholder="Enter product's name" onChange={(e) => setName(e.target.name)} />
                <input type="file" className="w-100 mb-3 p-2" name='photo' accept='image/*' placeholder='Upload an image' onChange={(e) => setPhoto(e.target.files[0])} />
                <div className="mb-3">
                  {photo && (
                    <div className='image-container' style={{ width: '200px', height: '200px' }}>
                      <img className='w-100 h-100 object-fit-cover' src={URL.createObjectURL(photo)} alt="product img" />
                    </div>

                  )}
                </div>
                <textarea type="text" className="w-100 mb-3 p-2" placeholder='Description about product' name='description' onChange={(e) => setDescription(e.target.description)} />
                <input type="number" className="w-100 mb-3 p-2" placeholder='Price' name='price' onChange={(e) => setPrice} min="1"/>
                <input type="number" className="w-100 mb-3 p-2" placeholder='Quantity' name='quantity' onChange={(e) => setQuantity(e.target.quantity)} min="1"/>
                <input type="text" className="w-100 mb-3 p-2" placeholder='Shipping' name='shipping' onChange={(e) => setShipping(e.target.shipping)} />
                <button type='submit' className='btn btn-primary'>Post</button>
              </div>
            </form>



          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct;
