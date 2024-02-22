import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({});

    useEffect(() => {
        const getSingleCategory = async () => {
            try {
                // Fetch the single category data based on ID
                const { data } = await axios.get(`http://localhost:8000/api/v1/category/single-category/${id}`);
                setCategory(data); // Update the state with fetched category data
            } catch (error) {
                console.error(error);
                toast.error("Error while fetching category details!");
            }
        }

        getSingleCategory(); // Call getSingleCategory when the component mounts
    }, [id]); // Depend on id to re-fetch category when it changes

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/v1/category/update-category/${id}`, category);
            toast.success("Category updated successfully!");
            navigate("/dashboard/admin/create-category");
        } catch (error) {
            console.error(error);
            toast.error("Error while updating category!");
        }
    }

    return (
        <div>
            <form onSubmit={handleUpdate} className='p-4 m-3'>
                <input type="text" value={category?.name || ''} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                <button type='submit' className='btn btn-primary m-3'>Edit</button>
            </form>
        </div>
    )
}

export default UpdateCategory;
