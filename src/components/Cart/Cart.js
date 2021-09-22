import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import { CartContext } from "../../context/CartContext";

import { db } from "../firebase";
import { setDoc, doc, updateDoc, Timestamp } from "firebase/firestore/lite";

import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
  form: {
    padding: "4px",
  },
}));
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
  const classes = useStyles();

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
      stock: item.item.stock - item.quantity
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
        <Grid key="id" container spacing={4}>
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.form}>
              <TextField
                required
                id="name"
                label="Nombre"
                type="email"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <TextField
                required
                id="email"
                label="Email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              clear();
            }}
          >
            Limpiar carrito
          </Button>
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
