import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from './../../components/PaginationComponent/index';
import { Prices } from './../../hooks/Price.js';
import {
  WrapperLableText,
  LineBreak
} from '../../components/NavBarComponent/style.js';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { routes } from './../../routes/index';
import '../../components/CardTypeProduct/style.css';

const TypeProductPage = () => {

  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null); // Selected price range
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [pageSize] = useState(); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [searchResults, setSearchResults] = useState([]); // Search results
  



  // get Total Count 
  const getTotal = async () => {
    try {
      const {data} = await axios.get("http://localhost:3001/api/customer/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }

  }

    // Get Products for the current page
    const getProductsForPage = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return products.slice(startIndex, endIndex);
    };

  // Get Product
  const getAllProduct = async () => {
    try {
      const data = await axios.get(
        'http://localhost:3001/api/customer/product/get-all'
      );
         // Shuffle the products and limit to 20
         const shuffledProducts = shuffle(data.data.data).slice(0, 10);
      setProducts(shuffledProducts);
    } catch (error) {
      console.log(error);
    }
  };

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
  // Get Category
  const getAllCategory = async () => {
    try {
      const data = await axios.get('http://localhost:3001/admin/category');
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProduct();
   
  }, []);


  const handleFilter = (value, id) => {
    if (value) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((category) => category !== id));
    }
  };

  const handlePriceFilter = (priceRange) => {
    setSelectedPrice(priceRange);
    getFilteredProduct();
  };


  useEffect(() => {
    if (checked.length === 0 && !selectedPrice) {
      // No filters selected, load all products
      getAllProduct();
    } else {
      // Filter products by selected categories and price
      getFilteredProduct();
    }
  }, [checked, selectedPrice, currentPage]);



  const getFilteredProduct = async () => {
    try {
      const data = await axios.post(
        'http://localhost:3001/api/customer/product/get-filtered',
        { checked, priceRange: selectedPrice }
      );

      setProducts(data?.data.data);
      const shuffledProducts = shuffle(data?.data.data);
      setProducts(shuffledProducts);
    } catch (error) {
      console.log(error);
    }
  };


  // Function to handle the search and update the search results
  const handleSearch = async (query) => {
    try {
      
      const response = await axios.get(
        `http://localhost:3001/api/customer/product/get-all&filter=${query}`
      );
      const allProducts = response.data.data;
      
      // Filter products by matching lowercase names
      const searchResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
  
      setSearchResults(searchResults);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  
  return (
    <div
      style={{
        backgroundColor: '#eff0f5',
        height: '100%',
        padding: '10px 50px'
      }}
    >
  
      <h5 className='pt-3'>
        <span
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => {
            navigate('/');
          }}
        >
          Trang chủ
        </span>
        - Loại Sản Phẩm
      </h5>

      <Container
        style={{
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end'
        }}
      >
        <div style={{}}>
          <Row
            style={{
              padding: '10px 10px',
              width: '1400px',
              flexWrap: 'nowrap',
              paddingTop: '10px',
              gap: '25px'
            }}
          >
            <Col
              sm={2}
              style={{
                background: '#fff',
                marginRight: '10px',
                padding: '10px',
                borderRadius: '6px',
                height: '55vh'
              }}
            >
              <div>
                <WrapperLableText>Filter Category</WrapperLableText>

                {categories.map((category, index) => (
                  <div
                    className='d-flex accordionform-check form-check-inline'
                    key={category._id}
                  >
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={`inlineCheckbox_${category._id}`}
                      value={category._id}
                      onChange={(e) =>
                        handleFilter(e.target.checked, category._id)
                      }
                      checked={checked.includes(category._id)}
                    />
                    <label
                      className='form-check-label mx-2'
                      htmlFor={`inlineCheckbox_${category._id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}

                <LineBreak />

                <WrapperLableText>Filter Price</WrapperLableText>

                {Prices.map((price) => (
                  <div className='form-check' key={price._id}>
                    <input
                      className='form-check-input'
                      type='radio'
                      value={price.name}
                      name='flexRadioDefault'
                      id={`flexRadioDefault${price._id}`}
                      onChange={() => handlePriceFilter(price.array)}
                      checked={selectedPrice === price.array}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={`flexRadioDefault${price._id}`}
                    >
                      {price.name}
                    </label>
                  </div>
                ))}

                <div className='d-flex flex-column mt-4'>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      setChecked([]); // Reset category filters
                      setSelectedPrice(null); // Reset price filter
                      getAllProduct(); // Load all products
                    }}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            </Col>
            <Col sm={10}>
            {searchResults.length > 0 ? (
                   <div>
      <h2>Search Results:</h2>
      <div className="search-results">
        {searchResults.map((product) => (
          <div key={product._id} className="search-result-item">
            <img
              src={product.img}
              alt={product.name}
              className="search-result-image"
            />
            <div className="search-result-details">
              <h3 className="search-result-name">{product.name}</h3>
              <p className="search-result-price">
                Price: {product.price} VND
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
      ) : (
              <div
                className=' h-auto d-grid grid-4 '
                style={{ gap: '20px', height: '100vh' }}
              >
                {products.map((product) => (
                  <Card className='card-item' key={product._id} onClick={() => navigate(`/product-detail/${product._id}`)}>
                    {/* <Link to={}> */}
                      <Card.Img
                        variant='top'
                        src={product.img}
                        style={{ width: "267px", height: "200px" }}
                        className='object-object-fit-contain'
                      />
                      <Card.Body className='item-body mt-5'>
                        <Card.Text
                          className='item-desc'
                          style={{ textDecoration: 'none' }}
                        >
                          <div className='desc-details'>
                            {product.name}
                          </div>
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
                    {/* </Link> */}
                  </Card>
                ))}
              </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <PaginationComponent    currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(products.length / pageSize)} />
    </div>
  );
};

export default TypeProductPage;


