import React from 'react'
import { routes } from './../../routes/index'
import { NavLink } from 'react-router-dom'
import './style.css'

const TypeProduct = ({ name }) => {
  const typeProductPath = routes.find(
    route => route.path === '/type'
  )

  return (
    <NavLink to={typeProductPath.path} className='mb-3 mt-4 text-decoration-none text-black  ' >
       <span className='text-underline-hover'>{name}</span>
    </NavLink>
  )
}

export default TypeProduct