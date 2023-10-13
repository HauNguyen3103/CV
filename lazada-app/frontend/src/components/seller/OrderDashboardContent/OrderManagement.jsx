import { useState, useEffect } from 'react';
import OrderList from './OrderList';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('auth'));
        const vendor_id = { vendor_id: userData._id };

        // Fetch data from the API
        fetch('http://localhost:3001/api/vendor/order/get-order-by-vendor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendor_id),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'OK') {
                    setOrders(data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    // Function to update the product status via API
    const updateProductStatus = (orderId, productId, newStatus) => {
        const apiUrl = 'http://localhost:3001/api/vendor/order/update-order';
        const requestData = {
            productId: productId,
            orderId: orderId,
            status: newStatus,
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'OK') {
                    // If the API call is successful, update the state
                    handleProductStatusChange(orderId, productId, newStatus);
                    window.location.reload();
                } else {
                    console.error('Error updating product status via API:', data.error);
                }
            })
            .catch((error) => {
                console.error('Error updating product status via API:', error);
            });
    };

    const handleProductStatusChange = (orderId, productId, newStatus) => {
        const updatedOrders = orders.map((order) => {
            if (order.orderId === orderId) {
                const updatedProducts = order.products.map((product) => {
                    if (product.productId === productId) {
                        return { ...product, status: newStatus };
                    }
                    return product;
                });
                return { ...order, products: updatedProducts };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    // Function to filter orders with "Pending" status only
    const filterPendingOrders = () => {
        return orders.filter((order) => {
            return order.products && order.products.some((product) => product.status === 'New');
        });
    };

    // Apply the filter to get orders with "Pending" status only
    const filteredOrders = filterPendingOrders();

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const paginationControls = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationControls.push(
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
            >
                {page}
            </button>
        );
    }

    return (
        <div>
            <OrderList
                orders={currentOrders}
                onProductStatusChange={updateProductStatus}
            />

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {paginationControls}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastOrder >= filteredOrders.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrderManagement;
