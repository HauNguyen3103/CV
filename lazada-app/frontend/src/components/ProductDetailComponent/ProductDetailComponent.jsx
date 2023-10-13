import { useState, useEffect } from 'react'
import React from 'react'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import styled from 'styled-components'
import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import {useCart} from "../../context/CartContext.js"



const WrapperPriceProdduct = styled.div`
  background: rgb();
  border-radius: 4px;
  margin-top: 30px;
`

const WrapperPriceTextProduct = styled.h2`
  font-size: 30px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  color: #f57224;
`
const WrapperOldPriceTextProduct = styled.h2`
  text-decoration: line-through;
  font-size: 20px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 400;
  opacity: 0.7;
`

const WrapperQualityProduct = styled.div`
  margin-top: 40px;
  font-size: 30px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
`

const ProductDetailComponent = () => {
  const params = useParams();
  const [show, setShow] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);




  const getProduct = async(id) => {
    try {
      const data = await axios.get(`http://localhost:3001/api/customer/product/get-details/${params.id}`);
      setProducts(data.data.data);
      console.log(data)
    } catch (error) {
        console.log(error);
    }
  }

  console.log(products);
  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  

  

  console.log(cart);



  return (
    <div style={{ padding: '10px 10px' }}>
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col sm={6}>
            <Image
              src={products.img}
              rounded
              style={{ width: '540px', heigth: '250px' }}
            />
           
          </Col>
          <Col sm={6}>
            <h2>
              {products.name}
            </h2>
            <p>
              {products.description}
            </p>
            <WrapperPriceProdduct>
              <WrapperPriceTextProduct>{products.price} $</WrapperPriceTextProduct>
              <WrapperOldPriceTextProduct>
              {products.old_price} $
              </WrapperOldPriceTextProduct>
            </WrapperPriceProdduct>
          
            <div className='mt-5'>
              <Button
                size='lg'
                style={{ width: '200px' }}
                variant='warning'
                onClick={() => {
                    setShow(true);
                    setCart([...cart, products]);
                    localStorage.setItem('cart',JSON.stringify([...cart, products]) )
                  }}
              >
                Buy Now
              </Button>
              <Button
                size='lg'
                style={{ width: '200px' }}
                className='custom-button mx-4'
                onClick={() => {
                    setShowAdd(true);
                    setCart([...cart, products]);
                    localStorage.setItem('cart',JSON.stringify([...cart, products]) )
                  }}
        
              >
                Add to Cart
              </Button>

              <Col xs={6}>
                <ToastContainer
                  position='top-end'
                  className='p-3 rounded-2'
                  style={{ zIndex: 1, marginTop: '50px' }}
                >
                  <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                  >
                    <Toast.Header>
                      <img
                        src='holder.js/20x20?text=%20'
                        className='rounded'
                        alt=''
                      />
                      <strong className='mx-auto'>Notification</strong>
                    </Toast.Header>
                    <Toast.Body
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      Buy Product Successfully
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
              </Col>
              <Col xs={6}>
                <ToastContainer
                  position='top-end'
                  className='p-3'
                  style={{ zIndex: 1, marginTop: '50px' }}
                >
                  <Toast
                    onClose={() => setShowAdd(false)}
                    show={showAdd}
                    delay={3000}
                    autohide
                  >
                    <Toast.Header>
                      <img
                        src='holder.js/20x20?text=%20'
                        className='rounded mx-2'
                        alt=''
                      />
                      <strong className='mx-auto'>Notification</strong>
                    </Toast.Header>
                    <Toast.Body
                      style={{
                        backgroundColor: '#f3742f',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      Add to Cart successfully
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>  
    </div>
  )
}

export default ProductDetailComponent
