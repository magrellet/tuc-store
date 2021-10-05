import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

import Item from "./Item";

const ItemList = ({ data }) => {
  let categoryId = data.params.id ? parseInt(data.params.id) : 0;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getProducts = async (db) => {
      const products = collection(db, "products");
      const productsSnapshot = await getDocs(products);

      const productsList = [];
      productsSnapshot.forEach((element) => {
        productsList.push({ ...element.data(), id: element.id });
      });

      setItems(
        categoryId === 0
          ? productsList
          : productsList.filter((item) => item.categoryId === categoryId)
      );
    };
    getProducts(db);
  }, [categoryId]);

  return (
    <Paper sx={{ p: 4, margin: "auto", flexGrow: 1 }}>
      <Grid container spacing={3}>
        {items.length !== 0 ? (
          items.map((item, i) => {
            return (
              <Grid key={i} item xs={12} md={6} lg={4}>
                <Item item={item} />
              </Grid>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Paper>
  );
};

export default ItemList;
