import React, { useState, useContext } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { routes } from './../../routes/index'
import axios from 'axios'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useAuth } from '../../context/AuthContext'


const SignInPage = () => {
  const signUpPath = routes.find(route => route.path === '/sign-up')
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [show, setShow] = useState(false)


  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:3001/api/customer/user/sign-in', {
        email,
        password
      })

      if (res && res.data) {
        setSuccessMessage('Login successfully!')
        setShow(true);
        setAuth({             // SET AUTH TOKEN
          ...auth,
          user: res.data.checkUser,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          setShow(false); // Hide the login success Toast after a delay
          navigate( location.state || '/');
        }, 1000);
      } else {
        handleRegistrationError('Login failed, Please try again!!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegistrationError = error => {
    setErrorMessage(error)
    setShowError(true)
  }

  return (
    <div style={{ background: '#ccc', height: 'auto' }}>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-2 border-primary' />
            <Card className='shadow px-4'>
              <Card.Body>
                <div className='mb-3 mt-md-4'>
                  <div className='d-flex align-items-center justify-content-center'>
                    <img
                      src='https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png'
                      className='w-50'
                      alt=''
                    />
                  </div>
                  <div className='mb-3 p-2 mt-3 text-center'>
                    <h3> Đăng Nhập Tài Khoản </h3>
                  </div>

                  <div className='mb-3'>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Nhập email của bạn vào đây'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Vui lòng nhập password của bạn'
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-4'>
                      <div className='mb-0  text-center'>
                        Chưa tạo tài khoản, đăng ký tại đây ??{' '}
                        <NavLink
                          to={signUpPath.path}
                          className='text-primary fw-bold'
                        >
                          Sign Up
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/* Toast Notification */}
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
                  {successMessage}
                </Toast.Body>
              </Toast>
            </ToastContainer>

            {/* Error Toast Notification */}
            <ToastContainer
              position='top-end'
              className='p-3 rounded-2'
              style={{ zIndex: 1, marginTop: '50px' }}
            >
              <Toast
                onClose={() => setShowError(false)}
                show={showError}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <img
                    src='holder.js/20x20?text=%20'
                    className='rounded'
                    alt=''
                  />
                  <strong className='mx-auto'>Error</strong>
                </Toast.Header>
                <Toast.Body
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  {errorMessage}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignInPage
