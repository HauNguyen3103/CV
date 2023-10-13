import Order from './Order';

const OrderList = ({ orders, onProductStatusChange }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <Order key={`${order._id}-${index}`} order={order} onProductStatusChange={onProductStatusChange} />
      ))}
    </div>
  );
};

export default OrderList;
