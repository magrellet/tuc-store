import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

const Cart = (props) => {
  const { cartItems } = useContext(CartContext);
  return <div>{`items: ${JSON.stringify(cartItems)}`}</div>;
};

export default Cart;
