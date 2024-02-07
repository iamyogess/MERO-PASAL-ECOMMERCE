import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function UserMenu() {
    const location = useLocation();
    return (
        <div className="list-group">
            <h4 className='text-center'>Dashboard</h4>
            <Link to="/dashboard/user/profile" className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/user/profile' ? 'active' : ''}`}>Profile</Link>
            <Link to="/dashboard/user/orders" className={`list-group-item list-group-item-action ${location.pathname === '/dashboard/user/orders' ? 'active' : ''}`}>Create Product</Link>
        </div>
    );
}

export default UserMenu;
