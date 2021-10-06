import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItemDetail = (props) => {
  const { cartItem, i, removeItem } = props;

  return (
    <Paper id={i} sx={{ p: 4, m: 5, mr: "auto", ml: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={cartItem.item.img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {cartItem.item.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Precio Unitario: {cartItem.item.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantidad: {cartItem.quantity}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                <Button
                  onClick={() => {
                    removeItem(cartItem.item.id);
                  }}
                >
                  Remover
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Precio total: {cartItem.item.price * cartItem.quantity}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItemDetail;
