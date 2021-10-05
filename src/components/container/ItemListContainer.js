import React from "react";
import ItemList from "./items/ItemList";

const ItemListContainer = ({ match }) => {
  return <ItemList data={match} />;
};

export default ItemListContainer;
