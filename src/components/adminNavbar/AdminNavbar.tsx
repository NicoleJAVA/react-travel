import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const api = `${process.env.REACT_APP_API}/logout`;
    try {
      const response = await axios.post(api, null);
      if (response.data.success) {
        console.log('Successfully logged out.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">賣家中心</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/dashboard/products" className="nav-link">產品</Link>
            <Link to="/dashboard/orders" className="nav-link">訂單</Link>
            <Link to="/dashboard/coupons" className="nav-link">優惠券</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="nav-link">登出</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
