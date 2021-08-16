import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Item from "./Item";

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setItems(data.filter((item) => item.userId === 1)));
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {items.map((item, i) => {
          return (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <Item item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
