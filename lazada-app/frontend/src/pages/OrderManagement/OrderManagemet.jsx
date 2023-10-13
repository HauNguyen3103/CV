import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/AdminLayout/UserMenu';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const customerID = { "customerID": auth.checkUser._id };
  
      if (customerID) {
        fetch('http://localhost:3001/api/customer/order/get-all-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerID)
        })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'OK') {
            setOrders(data.data);
          } else {
            console.error('Error fetching orders:', data.message);
          }
        })
        .catch(err => {
          console.error('API call error:', err);
        });
      }
    }, []);
  
    const handleStatusChange = (orderId, productId, newStatus) => {
      // Make API request to change the status of the product
      fetch('http://localhost:3001/api/customer/order/update-order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          productId,
          status: newStatus
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          // Update local state only after the API call succeeds
          setOrders(prevOrders => 
            prevOrders.map(order => {
              if (order._id === orderId) {
                return {
                  ...order,
                  items: order.items.map(item => {
                    if (item._id === productId) {
                      return { ...item, status: newStatus };
                    }
                    return item;
                  })
                }
              }
              return order;
            })
          );
        } else {
          console.error('Error updating order status:', data.message);
        }
      })
      .catch(err => {
        console.error('API call error:', err);
      });
    };

  return (
    <div className="container-fluid p-3 m-3" style={{ height: "80vh" }}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h3>Track Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                Order ID: {order._id} <br />
                Total: {order.total} <br />
                {order.items.map(item => (
                  <div key={item._id}>
                    Product Name: {item.name} <br />
                    Status: {item.status} <br />
                    <button 
                      disabled={item.status !== 'Shipped'} 
                      onClick={() => handleStatusChange(order._id, item._id, 'Accepted')}>
                      Accept
                    </button>
                    <button 
                      disabled={item.status !== 'Shipped'} 
                      onClick={() => handleStatusChange(order._id, item._id, 'Rejected')}>
                      Reject
                    </button>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
