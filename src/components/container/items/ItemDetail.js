import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import ItemCount from "./ItemCount";
import { CartContext } from "../../../context/CartContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "4%",
    margin: "1%",
    marginLeft: "30%",
    marginRight: "30%",
    display: "flex",
    paddingRight: "70px",
    paddingLeft: "70px",
    maxWidth: "400px",
    flexGrow: 1,
  },
}));

const ItemDetail = ({ item }) => {
  const initialQuantity = 0;
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const { addItem } = useContext(CartContext);
  const classes = useStyles();

  const onAdd = (quantityToAdd) => {
    setItemQuantity(quantityToAdd);
    addItem(item, quantityToAdd);
  };

  return (
    <Card className={classes.card}>
      {item && (
        <Typography component="div">
          <CardMedia
            component="img"
            alt="img"
            height="600"
            src={item.img}
            title="img"
          />
          <Typography variant="h4" color="textPrimary">
            {item.title}
          </Typography>
          <br />
          <Typography variant="h5" color="textSecondary">
            {item.body}
          </Typography>
          <br />
          <Typography variant="subtitle1" color="textSecondary">
            Precio: {item.price}
          </Typography>
          <br />
          <ItemCount
            initialQuantity={initialQuantity}
            maxStock={item.stock}
            onAdd={onAdd}
          />
          {itemQuantity > 0 && (
            <CardActions>
              <Button
                component={Link}
                to="/cart"
                variant="contained"
                color="primary"
              >
                Ver carrito
              </Button>
              <br />
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Seguir comprando
              </Button>
            </CardActions>
          )}
        </Typography>
      )}
    </Card>
  );
};

export default ItemDetail;
