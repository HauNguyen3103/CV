  import React, { useState } from 'react'
  import './HeaderComponent.css'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
  import { Link, NavLink, useNavigate } from 'react-router-dom'
  import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import NavDropdown from 'react-bootstrap/NavDropdown';
  import { useAuth } from '../../context/AuthContext'
  import {useCart} from "../../context/CartContext.js"
  import useCategory from './../../hooks/useCategory';



  const HeaderComponent = () => {
    const [cart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()
    const products = useCategory();
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearchSubmit = (e) => {
      e.preventDefault();
      navigate(`/searching-products/${searchQuery}`);
    };
    const handleLogout = () => {
      setAuth({
        ...auth, 
        user:null,
        token: ''
      });
      localStorage.removeItem('auth');
    }


    return (
      <div className='header'>
        <nav className='navbar navbar-expand'>
          <div className='navbar-container'>
            <ul className='navbar-nav'>
                {!auth.user? (
                  <>
                  <li className='nav-item'>
                    <NavLink to='/sign-in' className='nav-link'>
                        LOGIN
                      </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/sign-up' className='nav-link'>
                        SIGN UP
                      </NavLink>
                  </li>
                
                  </>
                ): (<>               
                    <Navbar expand="lg" className="bg-body-tertiary">
                          <Container>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                              <NavDropdown style={{ fontSize: "15px" }} title={auth?.user?.name} id="basic-nav-dropdown">
                                <NavDropdown.Item as={NavLink} to={'/dashboard/user'} style={{ fontSize: "15px" }}>
                                Dasboard</NavDropdown.Item>
                                <NavDropdown.Item  as={NavLink} to="/sign-in" style={{ fontSize: "15px" }} onClick={handleLogout}>
                                Logout
                                </NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                          </Navbar.Collapse>
                      </Container>
                  </Navbar>             
                </>)}
            </ul>
          </div>
        </nav>
        <div className='lzd-logo-bar'>
          <div className='logo-bar-content'>
            <div className='lzd-logo-content'>
              <Link to='/' className='lzd-logo-link'>
                <img
                  src='//laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png'
                  alt='Online Shopping Lazada.vn Logo'
                />
              </Link>
            </div>

            <div className='search-bar-content'>
              <form className='search-form' onSubmit={handleSearchSubmit} >
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='btn search-btn' type='submit'>
                 Search
                </button>
              </form>
            </div>
            
            <div className='cart-bar-content'>
            <NavLink to='/my-order'>
              {cart.length > 0 ? (
                <span className='cart-item'>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className='badge text-center'>{cart.length}</span>
                </span>
              ) : (
                <span className='cart-item'>
                  <FontAwesomeIcon icon={faCartShopping} />
                </span>
              )}
            </NavLink>
            </div>

          </div>
        </div>
      </div>
    )
  }

  export default HeaderComponent
