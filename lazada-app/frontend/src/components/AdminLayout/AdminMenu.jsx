import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { NavLink, useLocation } from 'react-router-dom'

const AdminMenu = () => {

  return (
    <ListGroup as='ul'>
      <NavLink to="/dashboard/admin" style={{ fontSize: "25px", fontWeight: "bold", textDecoration: "none", color : "black" }}>Admin Panel</NavLink>
      <NavLink to='/dashboard/admin/create-category'>
        <ListGroup.Item as='li' action>
          Create Category
        </ListGroup.Item>
      </NavLink>
      <NavLink to='/dashboard/admin/create-product'>
        <ListGroup.Item as='li' action>
          Create Product
        </ListGroup.Item>
      </NavLink>
      <NavLink to='/dashboard/admin/users'>
        <ListGroup.Item as='li' action>
          Users
        </ListGroup.Item>
      </NavLink>
    </ListGroup>
  )
}

export default AdminMenu