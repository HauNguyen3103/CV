import Navigation from './pages/seller/Navigation';
import ProductPage from './pages/seller/ProductPage';
import OrderPage from './pages/seller/OrderPage';
import StatsPage from './pages/seller/StatsPage';
import React from 'react';
import { useNavigate } from 'react-router-dom'

const SellerPage = () => {
  const userData = JSON.parse(localStorage.getItem('auth'));
  const navigate = useNavigate();

  if (!userData.name || !userData._id) {
    navigate('/seller/404');
  } else {
    return (
      <div>
        <Navigation />
        <ProductPage />
        <OrderPage />
        <StatsPage />
      </div>
    );
  }

};

export default SellerPage;
