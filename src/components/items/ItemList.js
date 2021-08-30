import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import Item from "./Item";
import "./ItemList.css";

const ItemList = ({ data }) => {
  let categoryId = data.params.id ? parseInt(data.params.id) : 0;
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/de181b41-132e-4ad3-ae3e-fbcbf501746c")
      .then((response) => {
        setTimeout(() => {
          setItems(
            categoryId === 0
              ? response.data
              : response.data.filter((item) => item.categoryId === categoryId)
          );
        }, 1000);
      });   
  }, [categoryId]);

  return (
    <Container className="Container">
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
