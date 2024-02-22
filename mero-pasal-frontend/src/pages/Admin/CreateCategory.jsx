import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from '../../components/form/CategoryForm';
import UpdateCategory from '../../components/form/UpdateCategory';
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/category/create-category", { name });
      if (data?.success) {
        toast.success(`${data.name} is created!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form!");
    }
  }

  // get all cats 
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category!");
    }
  }

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'><AdminMenu /></div>
          <div className='col-md-9'><h1>Manage Category</h1>
            <div className="p-3 w-75">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {categories?.map(category => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        {console.log(category._id)}
                        <td><Link to={`/dashboard/admin/update-category/${category._id}`} className="text-white text-decoration-none btn btn-primary">Edit</Link></td>
                        <td><button className='btn btn-danger' onClick={() => handleDelete(category._id)}>Delete</button></td>

                      </tr>
                    </>
                  ))}

                </tbody>
              </table>

            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory