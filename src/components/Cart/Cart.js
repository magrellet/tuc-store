import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

import { CartContext } from "../../context/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Cart = () => {
  const { cartItems, removeItem, clear } = useContext(CartContext);
  const classes = useStyles();

  return (
    <div>
      {cartItems.length !== 0 ? (
        cartItems.map((cartItem, i) => {
          return (
            <div className={classes.root}>
              <Paper key={i} className={classes.paper}>
                <Grid key={i} container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={cartItem.item.img}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {cartItem.item.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                        >
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
                      <Typography variant="subtitle1">
                        Cantidad: {cartItem.quantity}
                      </Typography>
                      <Typography variant="subtitle1">
                        Precio total: {cartItem.item.price * cartItem.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })
      ) : (
        <Grid item>
          <Typography variant="subtitle1">
            El carrito esta vacio
            <br />
            <Link to={"/"}>
              <Button variant="contained" color="primary">
                Agregar items a mi carrito
              </Button>
            </Link>
          </Typography>
        </Grid>
      )}
      {cartItems.length !== 0 ? (
        <Grid key="id" container spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              clear();
            }}
          >
            Limpiar carrito
          </Button>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
