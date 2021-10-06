import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  
  const addItem = (item, quantity) => {
    if (quantity !== 0) {
      let cartItem = { item: item, quantity: quantity };
      if (isInCart(item.id)) {
        const localCartItems = cartItems.filter((element) => element.item.id !== item.id); 
        localCartItems.push(cartItem);
        setCartItems(localCartItems);
      } else {
        setCartItems([...cartItems, cartItem]);
      }      
    }    
    setTotalQuantity(quantity === 0 ? quantity : countItemQuantity(cartItems));
  };

  const removeItem = (itemId) => {
    const itemsToRemove = cartItems.filter(element => element.item.id !== itemId);
    setCartItems(itemsToRemove);
    setTotalQuantity(countItemQuantity(itemsToRemove));
  };

  const clear = () => {
    setCartItems([]);
    setTotalQuantity(0);
  };

  const isInCart = (itemId) => {
    return cartItems.find(element => element.item.id === itemId) !== undefined;
  };

  const countItemQuantity = (itemsToRemove) => {
    let total = 0;
    itemsToRemove.forEach(element => {
      total += element.quantity;      
    })
    return total;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        setCartItems,
        addItem,
        removeItem,
        clear,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
