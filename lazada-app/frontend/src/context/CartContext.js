import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";


const CartContext = createContext();


 const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);


    const setQuantity = (productId, newQuantity) => {
        // Find the product in the cart by its productId
        const updatedCart = cart.map((item) => {
          if (item._id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
    
        // Update the local cart state
        setCart(updatedCart);
    
        // Update local storage with the updated cart
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      };

    return (
        <CartContext.Provider value={[ cart, setCart, setQuantity ]}>
            {children}
        </CartContext.Provider>
    );
};


 const useCart = () => useContext(CartContext);

 const useSetQuantity = () => {
    const { setQuantity } = useContext(CartContext);
    return setQuantity;
  };

export {useCart, CartProvider, useSetQuantity};
