import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";

import { CartContext } from "../../context/CartContext";

import { db } from "../firebase";
import { setDoc, doc, updateDoc, Timestamp } from "firebase/firestore/lite";

import { v4 as uuid } from "uuid";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const buyerDefaultValues = {
  name: "Martin",
  phone: "381xxxxxxx",
  email: "mail@mail.com",
};

const Cart = () => {
  const { cartItems, removeItem, clear } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [buyer, setBuyer] = useState(buyerDefaultValues);
  const [orderId, setOrderId] = useState(uuid);

  useEffect(() => {
    setBuyer({ name: name, phone: phone, email: email });
  }, [name, phone, email]);

  const handleClickOpen = () => {
    if (name !== "" && email !== "" && phone !== "") {
      setBuyer({ name: name, phone: phone, email: email });
    }
    handleOrder();
    setOpen(true);
  };

  const handleOrder = () => {
    const myItems = [];
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      updateStockInProduct(item);
      totalQuantity += item.quantity * item.item.price;
      myItems.push({
        title: item.item.title,
        id: item.item.id,
        price: item.item.price,
      });
    });
    const myOrder = {
      buyer: buyer,
      items: myItems,
      total: totalQuantity,
      date: Timestamp.fromDate(new Date()),
    };
    saveOrder(myOrder);
  };

  const updateStockInProduct = async (item) => {
    const productRef = doc(db, "products", item.item.id);
    await updateDoc(productRef, {
      stock: item.item.stock - item.quantity,
    });
  };

  const saveOrder = async (myOrder) => {
    await setDoc(doc(db, "orders", orderId), myOrder);
  };

  const handleClose = () => {
    clear();
    setOpen(false);
  };

  return (
    <div>
      {cartItems.length !== 0 ? (
        cartItems.map((cartItem, i) => {
          return (
            <Paper
              id={i}
              sx={{ p: 4, m: 5, mx: 70, maxWidth: 500, flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={cartItem.item.img} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {cartItem.item.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Full resolution 1920x1080 • JPEG
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
        <Paper sx={{ p: 4, px: 40, m: 5, mx: 10, flexGrow: 1 }}>
          <Grid key="id" container spacing={1}>
            <TextField
              required
              id="name"
              label="Nombre"
              type="email"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box sx={{ p: 1 }} />
            <TextField
              required
              id="phone"
              label="Telefono"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
            <Box sx={{ p: 1 }} />

            <TextField
              required
              id="email"
              label="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box sx={{ p: 1 }} />

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                clear();
              }}
            >
              Limpiar carrito
            </Button>
            <Box sx={{ p: 1 }} />

            <Button
              disabled={!(name !== "" && email !== "" && phone !== "")}
              variant="contained"
              color="primary"
              onClick={() => {
                handleClickOpen();
              }}
            >
              Comprar
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Compra realizada"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Numero de transacción: {orderId}.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Paper>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
