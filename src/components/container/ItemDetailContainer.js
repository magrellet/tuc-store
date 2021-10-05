import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ItemDetail from "./items/ItemDetail";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const ItemDetailContainer = ({ match }) => {
  let itemId = match.params.id;
  const [item, setItem] = useState("");

  useEffect(() => {
    const getProducts = async (db) => {
      const products = collection(db, "products");
      const productsSnapshot = await getDocs(products);

      const productsList = [];
      productsSnapshot.forEach((element) => {
        productsList.push({...element.data(), id: element.id});
      });

      setItem(productsList.filter((item) => item.id === itemId)[0]);      
    }
    getProducts(db)
  },[itemId]);

  return (
    <div>{item !== "" ? <ItemDetail item={item} /> : <CircularProgress />}</div>
  );
};

export default ItemDetailContainer;
