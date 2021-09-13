import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import ItemCount from "./ItemCount";
import { CartContext } from "../../context/CartContext";

import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  const initialQuantity = 0;
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const { addItem } = useContext(CartContext);

  //This method is calling permanently the addItem in useContext after we click in an item count.
  //Keep looking for a fix
  const onAdd = (quantityToAdd) => {
    setItemQuantity(quantityToAdd);
    addItem(item, itemQuantity);
  }; 

  return (
    <Container maxWidth="sm" className="Container">      
      <Grid container spacing={3}>
        {item &&
        <Typography component="div">
          <CardMedia
            component="img"
            alt="img"
            height="600"
            src={item.img}
            title="img"
          />
          <Typography className="Typography" variant="h4" color="textPrimary">
            {item.title}
          </Typography>
          <Typography className="Typography" variant="h5" color="textSecondary">
            {item.body}
          </Typography>
          <Typography className="Typography" variant="h6" color="textSecondary">
            Precio: {item.price}
          </Typography>
          <ItemCount
            initialQuantity={initialQuantity}
            maxStock={item.stock}
            onAdd={onAdd}
          />
          {itemQuantity > 0 && (
            <CardActions>
              <Link
                to={{
                  pathname: "/cart",
                  state: { selectedItem: item, quantity: itemQuantity },
                }}
              >
                <Button variant="contained" color="primary">
                  Terminar mi compra
                </Button>
              </Link>
              <br />
              <Link to={"/"}>
                <Button variant="contained" color="primary">
                  Seguir comprando
                </Button>
              </Link>
            </CardActions>
          )}
        </Typography>
        }
      </Grid>
    </Container>
  );
};

export default ItemDetail;
