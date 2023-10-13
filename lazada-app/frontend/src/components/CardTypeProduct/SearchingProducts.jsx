import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { routes } from './../../routes/index'
import './style.css'
import useCategory from './../../hooks/useCategory';


const SearchingProduct = () => {
  const navigate = useNavigate();
  const allProducts = useCategory();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <div className=' h-auto d-grid grid-4 mx-5 ' style={{ gap: '20px', height: '100vh'}}>
    {allProducts.length === 0 ? (
        <div className='no-results'>No results found for "{searchQuery}"</div>
      )  :
    (allProducts?.map((product) => (
      <Card className='card-item mt-5' key={product._id} onClick={() => navigate(`/product-detail/${product._id}`)} >
          <Card.Img
            variant='top'
            src={product.img}
            className=''
          />
          <Card.Body className='item-body'>
            <Card.Text className='item-desc' style={{ textDecoration: "none"}} >
              <div className='desc-details'>
                    {product.name}
              </div>
            </Card.Text>
            <Card.Text className='item-price'>
              <div className='item-actual-price'>
                <span className='price'>{product.price}</span>
                <span className='currency'>VND</span>
              </div>
              <div className='item-price-before'>
                <span className='price'>{product.old_price}</span>
                <span className='currency'>VND</span>
              </div>
            </Card.Text>
          </Card.Body>
      </Card>
    )))}  
    </div>
  )
}

export default SearchingProduct
