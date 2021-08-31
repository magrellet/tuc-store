const Cart = (props) => {
  //TODO: Here we will have the items and their quantity
  //for future task
  return (
    <div>{`itemId: ${props.location.state.selectedItem.id} - Quantity: ${props.location.state.quantity}`}</div>
  );
};

export default Cart;
