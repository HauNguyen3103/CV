
import React, { useEffect, useState } from 'react';

const StatsMain = () => {
  const [orderStatus, setOrderStatus] = useState({
    New: 0,
    Shipped: 0,
    Cancelled: 0,
    Accepted: 0,
    Rejected: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchOrderStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('auth'));
        const vendor_id = { vendor_id: userData._id };

        const response = await fetch(
          'http://localhost:3001/api/vendor/order/get-all-order-status',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendor_id),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrderStatus(data.data);
        } else {
          // Handle errors here
          console.error('Failed to fetch order status');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrderStatus();
  }, []);

  return (
    <div>
      <h1>Order Status</h1>
      <ul>
        <li>New: {orderStatus.New}</li>
        <li>Shipped: {orderStatus.Shipped}</li>
        <li>Cancelled: {orderStatus.Cancelled}</li>
        <li>Accepted: {orderStatus.Accepted}</li>
        <li>Rejected: {orderStatus.Rejected}</li>
      </ul>
    </div>
  );
};

export default StatsMain;
