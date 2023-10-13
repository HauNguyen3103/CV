import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { NavLink } from 'react-router-dom'


const UserMenu = () => {
    return (
        <ListGroup as='ul'>
        <NavLink to="/dashboard/user" style={{ fontSize: "25px", fontWeight: "bold", textDecoration: "none", color : "black" }}>Dashboard</NavLink>
        <NavLink to='/dashboard/user/orders'>
          <ListGroup.Item as='li' action>
            Track Orders
          </ListGroup.Item>
        </NavLink>
      </ListGroup>
    );
};

export default UserMenu;