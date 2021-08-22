import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/9e25fcd6-a045-42d5-9a19-08fedebcb414")
      .then((response) => setItems(response.data));
  }, []);

  return (
    <Container>
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
