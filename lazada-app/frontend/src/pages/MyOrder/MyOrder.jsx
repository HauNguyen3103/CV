import React from "react";

import "./style.css";

import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";

import { NavLink , useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';

import { useCart } from '../../context/CartContext.js';





const MyOrder = () => {

    const cartData = JSON.parse(localStorage.getItem('cart'));

    let [cart] = useCart(cartData);

    const [auth, setAuth] = useAuth();
    
    console.log(cart);

    const [itemsState, setItemsState] = useState(Array.isArray(cart) ? cart : []);

    const [quantities, setQuantities] = useState(
        itemsState.map((item) => item.quantity)
    );

    const [totalQuantityDisplay, setTotalQuantityDisplay] = useState(
        (Array.isArray(cart) ? cart : []).reduce((acc, item) => acc + item.quantity, 0)
    );

    const [selectedItems, setSelectedItems] = useState(
        new Array(itemsState.length).fill(false)
    );

    const [subTotal, setSubTotal] = useState(0); // Tính subTotal

    const userData = JSON.parse(localStorage.getItem('auth'));

    const navigate = useNavigate();

    // Order section

    const [orders, setOrders] = useState([]);

    const [nextProductId, setNextProductId] = useState(1);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);



    const handleSubtract = (index) => {
        if (quantities[index] > 1) {
        const newQuantities = [...quantities];
        newQuantities[index] -= 1;
        setQuantities(newQuantities);
        }
    };

    const handleAdd = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;

        // Convert the string value to number and back to string.
        // This will remove any leading zeros.
        const sanitizedValue = String(Number(value));

        if (value === "" || /^[0-9]+$/.test(sanitizedValue)) {
        const newQuantities = [...quantities];
        newQuantities[index] = Number(sanitizedValue) || "";
        setQuantities(newQuantities);
        }
    };

    const handleInputBlur = (index) => {
        if (quantities[index] === "" || quantities[index] < 1) {
        const newQuantities = [...quantities];
        newQuantities[index] = 1;
        setQuantities(newQuantities);
        }
    };

    useEffect(() => {
        const total = quantities.reduce(
        (acc, quantity) => acc + (quantity || 0),
        0
        );
        setTotalQuantityDisplay(total);
    }, [quantities]);

    const toggleItemSelection = (index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = !newSelectedItems[index];
        setSelectedItems(newSelectedItems);
    };

    const singleItemDeleted = (index) => {
        const newItems = [...itemsState];
        newItems.splice(index, 1);
        setItemsState(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));

        // Also update quantities and selectedItems
        const newQuantities = [...quantities];
        newQuantities.splice(index, 1);
        setQuantities(newQuantities);

        const newSelectedItems = [...selectedItems];
        newSelectedItems.splice(index, 1);
        setSelectedItems(newSelectedItems);

        
        
    };

    const allItemsDeleted = () => {
        setItemsState([]); // Empty the itemsState array
        setQuantities([]); // Empty the quantities array
        setSelectedItems([]); // Empty the selected items array
        localStorage.removeItem('cart');
        navigate(0);
    };

    // Determine if all items are selected
    const allSelected = selectedItems.every((item) => item);

    // Handle select/deselect all items
    const toggleSelectAll = () => {
        if (allSelected) {
        setSelectedItems(new Array(itemsState.length).fill(false));
        } else {
        setSelectedItems(new Array(itemsState.length).fill(true));
        }
    };

    const calculateSubtotal = () => {
        let subTotal = 0;
        itemsState.forEach((item, index) => {
        if (selectedItems[index]) {
            subTotal += item.price * quantities[index];
        }
        });
        return subTotal;
    };

    useEffect(() => {
        setSubTotal(calculateSubtotal());
    }, [selectedItems, quantities, calculateSubtotal]);

    // Get the token from the localStorage
    const customer = {
        _id: userData?.checkUser?._id,
        name: userData?.checkUser?.name,
    }

    const shippingFee = 10;

    const total = subTotal + shippingFee;

    const createOrder = (newOrderData) => {
        fetch('http://localhost:3001/api/customer/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrderData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    // Handle success, e.g., redirect to a confirmation page
                    navigate('/track-order');
                    window.location.reload();
                } else {
                    throw new Error(data.message || 'Failed to create product');
                }
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleCheckout = (event) => {
        event.preventDefault();
        if (!userData) {
            alert("Please login to checkout.");
            navigate("/sign-in");
        } else {
            // Filter checked items and adjust their quantities
            const checkedItems = itemsState.reduce((acc, item, index) => {
                if (selectedItems[index]) {
                    acc.push({
                    ...item,
                    quantity: quantities[index],
                    });
                }
                return acc;
            }, []);

            // If no items are checked, then don't proceed with checkout.
            if (checkedItems.length === 0) {
            alert("No items are selected. Checkout aborted.");
            return;
            }

            const order = {
            items: checkedItems,
            subTotal: subTotal,
            shippingFee: shippingFee,
            total: total,
            customer: customer,
            };

            // Call createOrder to send the order data to the API
            createOrder(order);

            localStorage.removeItem('cart');
            
        }
        
    };

  return (
    <div
        style={{
            height: "100vh",

            padding: "25px 110px",

            backgroundColor: "#eff0f5",
        }}
    >
        <Row className="row">
            <Col sm={8} className="col">
            <Row>
                <div className="list-header">
                <div className="list-header-container">
                    <div className="list-header-main">
                    <div className="checkbox-wrap">
                        <label className="next-checkbox list-header-checkbox ">
                        <input
                            type="checkbox"
                            aria-checked={allSelected}
                            checked={allSelected}
                            onChange={toggleSelectAll}
                        />
                        </label>

                        <span>Select All ({totalQuantityDisplay} item(s))</span>
                    </div>

                    <div className="list-header-operations">
                        <div
                        className="btn-wrap automation-btn-delete"
                        onClick={allItemsDeleted}
                        >
                        <span className="trash-icon">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 1 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 trash-can"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                            </svg>
                        </span>

                        <span className="list-header-operation-text">Delete</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </Row>

            <Row>
                {itemsState.map((item, index) => (
                <div className="list-item-container" key={index}>
                    <div className="list-item-main">
                    <div className="list-item-left">
                        <label className="next-checkbox list-item-checkbox ">
                        <input
                            type="checkbox"
                            aria-checked="false"
                            value="on"
                            checked={selectedItems[index]}
                            onChange={() => toggleItemSelection(index)}
                        />
                        </label>

                        <div className="list-item-img">
                        <img className="item-img" src={item.img} alt="item-img" />
                        </div>

                        <div className="list-item-info">
                        <NavLink to="#" className="item-info-title">
                            {item.name}
                        </NavLink>

                        <NavLink to="#" className="item-info-sku">
                            {item.description}
                        </NavLink>
                        </div>
                    </div>

                    <div className="list-item-middle">
                        <div className="list-item-price">
                        <p className="item-price-details">
                            <span className="currency">$</span>

                            <span className="price">{item.price.toLocaleString("en-US")}</span>
                        </p>
                        </div>

                        <div className="list-item-function">
                        <div className="list-item-function-wrap">
                            <span
                            className="trash-icon"
                            onClick={() => singleItemDeleted(index)}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 1 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 trash-can"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                            </span>
                        </div>
                        </div>
                    </div>

                    <div className="list-item-right">
                        <div className="list-item-status">
                        <span className="status-functions">
                            <Button
                            onClick={() => handleSubtract(index)} // Modify the quantity based on the item's index
                            className="quantity-btn"
                            size="sm"
                            >
                            -
                            </Button>
                            <input
                            type="number"
                            min="1"
                            value={quantities[index]} // Display the quantity from state
                            onChange={(e) => handleInputChange(e, index)}
                            onBlur={() => handleInputBlur(index)}
                            autoComplete="off"
                            className="quantity-input"
                            />
                            <Button
                            onClick={() => handleAdd(index)} // Modify the quantity based on the item's index
                            className="quantity-btn"
                            size="sm"
                            >
                            +
                            </Button>
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </Row>
            </Col>

            <Col sm={4} className="col order-summary-wrapper">
                <form className="order-summary-form" onSubmit={(event) => handleCheckout(event)}>
                        <div className="order-summary">
                        <div className="order-summary-header">
                        <h3 className="order-summary-title">Order Summary</h3>
                        </div>

                        <div className="order-summary-body">
                        <div className="order-summary-checkout">
                            <div className="order-checkout-row">
                            <div className="checkout-row-label">Subtotal</div>

                            <div className="checkout-row-value">
                                <span className="currency">$</span>

                                <span className="price">
                                {subTotal.toLocaleString("en-US")}
                                </span>
                            </div>
                            </div>

                            <div className="order-checkout-row">
                            <div className="checkout-row-label">Shipping Fee</div>

                            <div className="checkout-row-value">
                                <span className="currency">$</span>

                                <span className="price">10</span>
                            </div>
                            </div>
                        </div>

                        <div className="order-total">
                            <div className="order-checkout-row">
                            <div className="checkout-row-label label-total">
                                Total (VAT included)
                            </div>

                            <div className="checkout-row-value">
                                <span className="currency">$</span>

                                <span className="price">
                                {total.toLocaleString("en-US")}
                                </span>
                            </div>
                            </div>
                        </div>

                        <div className="checkout-btn-wrapper">
                            <Button
                                className="checkout-btn"
                                variant="primary"
                                size="lg"
                                type="submit"
                            >
                                CONFIRM PURCHASE
                            </Button>
                        </div>
                        </div>
                    </div>
                </form>
            
            </Col>
        </Row>
    </div>
  );
};

export default MyOrder;
