import React, { useContext, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

import { CartContext } from "../../context/CartContext";

import { db } from "../firebase";
import { setDoc, doc, updateDoc, Timestamp } from "firebase/firestore/lite";

import { v4 as uuid } from "uuid";
import CartItemDetail from "./CartItemDetail";
import EmptyCart from "./EmptyCart";

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
  const [confEmail, setConfEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [buyer, setBuyer] = useState(buyerDefaultValues);
  const orderId = uuid();

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
            <CartItemDetail cartItem={cartItem} i={i} removeItem={removeItem} />
          );
        })
      ) : (
        <EmptyCart /> 
      )}
      {cartItems.length !== 0 ? (
        <Paper sx={{ p: 4, px: 40, m: 5, mr: "auto", ml: "auto", flexGrow: 1 }}>
          <Grid key="id" container spacing={1}>
            <TextField
              required
              id="name"
              label="Nombre"
              type="email"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              error={name === ""}
              helperText={name === "" ? 'Agregar Nombre' : ' '}
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
              error={phone === ""}
              helperText={phone === "" ? 'Agregar Numero Telefonico' : ' '}
            />
            <Box sx={{ p: 1 }} />
            <TextField
              required
              id="email"
              label="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email === ""}
              helperText={email === "" ? 'Agregar email' : ' '}
            />
            <Box sx={{ p: 1 }} />
            <TextField
              required
              id="conf-mail"
              label="Confirmar Email"
              defaultValue={email}
              onChange={(e) => setConfEmail(e.target.value)}
              error={confEmail === "" || email !== confEmail }
              helperText={ (confEmail === "" || email !== confEmail) ? 'Confirmar email' : ' '}
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
              disabled={!(name !== "" && email !== "" && phone !== "" && email === confEmail)}
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