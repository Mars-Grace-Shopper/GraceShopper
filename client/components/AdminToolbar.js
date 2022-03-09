import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AdminToolbar = () => {
  return (
    <div className='admin-toolbar'>
      <Link to='/userhome'>
        <header>Admin Toolbar</header>
      </Link>
      <ul>
        <Link to='/users'>
          <li>
            <div>
              <i className='ri-folder-user-line'></i>
              Users
            </div>
          </li>
        </Link>
        <Link to='/pies/table'>
          <li>
            <div>🥧 Products</div>
          </li>
        </Link>
        <li>
          <div>
            <i className='ri-shopping-cart-line'></i>
            Orders
          </div>
        </li>
        <li>
          <div>
            <i className='ri-line-chart-line'></i>
            Analytics
          </div>
        </li>
        <li>
          <div>
            <i className='ri-team-line'></i>
            Team
          </div>
        </li>
        <li>
          <div>
            <i className='ri-settings-2-line'></i>
            Settings
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
