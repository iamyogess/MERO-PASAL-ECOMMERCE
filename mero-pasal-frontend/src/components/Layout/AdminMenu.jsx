import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminMenu() {
    const location = useLocation();
    return (
        <div className="list-group">
            <h4 className='text-center'>Admin Panel</h4>
            <Link to="/dashboard/admin/create-category" className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/admin/create-category' ? 'active' : ''}`}>Create Category</Link>
            <Link to="/dashboard/admin/create-product" className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/admin/create-product' ? 'active' : ''}`}>Create Product</Link>
            <Link to="/dashboard/admin/users" className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/admin/users' ? 'active' : ''}`}>Users</Link>
        </div>
    );
}

export default AdminMenu;
