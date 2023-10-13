import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from './../../routes/index'

const NotFoundPage = () => {
  // Find the route that corresponds to the homepage
  const homepageRoute = routes.find(route => route.path === '/')

  return (
    <></>
    
  )
}

export default NotFoundPage
