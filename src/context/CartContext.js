import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItem = (item, quantity) => {
    if (quantity !== 0) {
      let cartItem = {};
      let localCartItems = [];
      if (isInCart(item.id)) {
        removeItem(item.id);
      }
      cartItem = { item: item, quantity: quantity };
      localCartItems = cartItems;
      localCartItems.push(cartItem);
      //This is temporarilly. State is not currently updating after finding and removing items
      //The repited items are still there
      setTotalQuantity(localCartItems.length);
      setCartItems(localCartItems);
    }    
    console.log(cartItems, totalQuantity);
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((element) => element.item.id !== itemId));
  };

  const clear = () => {
    setCartItems([]);
  };

  const isInCart = (id) => {
    return cartItems.find((element) => element.item.id === id) !== undefined;
  };

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
