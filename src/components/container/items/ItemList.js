import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    padding: "2%",
    margin: "auto",
    display: "flex",
  },
}));

const ItemList = ({ data }) => {
  let categoryId = data.params.id ? parseInt(data.params.id) : 0;
  const [items, setItems] = useState([]);
  const classes = useStyles();

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
    <Container className={classes.root} fixed>
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
    </Container>
  );
};

export default ItemList;
