import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const PaginationComponent = ({ currentPage, setCurrentPage }) => {
  const [pageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Initialize total pages to 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customer/product/get-all');
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / pageSize));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pageSize]);

  useEffect(() => {
    // Update total pages when products change
    setTotalPages(Math.ceil(products.length / pageSize));
  }, [products, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div style={{ padding: '30px 100px', display: 'flex' }}>
      <Container>
        <Row>
          <Col className='d-flex align-items-center justify-content-center'>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
        <Row>
          {currentProducts.map((product) => (
            <Col key={product.id} xs={12} md={4}>
              {/* Render your product information here */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PaginationComponent;
