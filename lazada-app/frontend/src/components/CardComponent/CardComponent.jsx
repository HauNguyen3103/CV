import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './CardComponent.css';
import { NavLink } from 'react-router-dom';
import { routes } from './../../routes/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CardComponent = () => {
  const loadMorePath = routes.find((route) => route.path === '/type');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  // Get Product

  console.log(products)
  const getAllProduct = async () => {
    try {
      const data = await axios.get(
        'http://localhost:3001/api/customer/product/get-all'
      );
      // Get the first 5 products and shuffle their images
      const shuffledProducts = shuffle(data.data.data).slice(0, 5);
      setProducts(shuffledProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex,
      temporaryValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <div>
      <h3 className='text-fw-bold mt-4'> #Just For You </h3>
      <div className='mt-4 h-auto d-flex' style={{ gap: '70px' }}>
        {products.map((product) => (
          <Card          
            onClick={() => navigate(`/product-detail/${product._id}`)}
            // to={`/product-detail/${product.id}`} // Assuming you have an 'id' field in your product data
            className='card-item'
            key={product.id}
          >
            <Card.Img
              variant='top'
              src={product.img}
              className='w-100 h-75 object-object-fit-cover'
            />
            <Card.Body className='item-body'>
              <Card.Text className='item-desc'>
                <div className='desc-details'>{product.name}</div>
              </Card.Text>
              <Card.Text className='item-price'>
                <div className='item-actual-price'>
                  <span className='price'>{product.price}</span>
                  <span className='currency'>$</span>
                </div>
                <div className='item-price-before'>
                  <span className='price'>{product.old_price}</span>
                  <span className='currency'>$</span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className='d-flex align-items-baseline justify-content-center mt-4'>
        <NavLink
          to={loadMorePath.path}
          className='w-25 bg-success p-3 rounded-3 text-white text-decoration-none text-center'
          style={{ fontSize: '20px' }}
        >
          Load More
        </NavLink>
      </div>
    </div>
  );
};

export default CardComponent;