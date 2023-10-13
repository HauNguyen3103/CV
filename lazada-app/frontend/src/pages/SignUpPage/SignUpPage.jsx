import React, { useContext } from 'react'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from './../../routes/index'
import { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'



const SignUpPage = () => {
  const signInPath = routes.find(route => route.path === '/sign-in')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/api/customer/user/sign-up', {
        name,
        email,
        phone,
        password
      })

      if (res && res.data) {
        setSuccessMessage('Account created successfully!')
        setShow(true)
        navigate('/sign-up')
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
      } else {
        handleRegistrationError('Registration failed, Please try again!!')
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
    <div style={{ background: '#ccc', height: 'auto', padding: '20px' }}>
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
                    <h3> Đăng Ký Tài Khoản </h3>
                  </div>
                  <div className='mb-3'>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>Email</Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Nhập email của bạn vào đây'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Name'>
                        <Form.Label className='text-center'>Name</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Nhập tên của bạn vào đây'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='Phone'>
                        <Form.Label className='text-center'>Phone</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='Nhập số điện thoại của bận vào đây'
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
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
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                          autoComplete='current-password'
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3 mt-5'
                        controlId='formBasicCheckbox'
                      />
                      <div className='d-grid'>
                        <Button variant='primary' type='submit'>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-4'>
                      <div className='mb-0  text-center'>
                        Already have an account??{' '}
                        <Link
                          to={signInPath.path}
                          className='text-primary fw-bold'
                        >
                          Sign In
                        </Link>
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

export default SignUpPage
