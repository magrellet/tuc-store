import React, { Component } from "react";
import ItemList from "../items/ItemList";

import "./ItemListContainer.css";

export class ItemListContainer extends Component {
  render() {
    return (
      <div>
        <h2 className="ItemListTitle">Más Buscados</h2>
        <ItemList />
      </div>
    );
  }
}

export default ItemListContainer;
