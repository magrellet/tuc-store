import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ItemCount from "./ItemCount";
import { CartContext } from "../../../context/CartContext";


const ItemDetail = ({ item }) => {
  const initialQuantity = 0;
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const { addItem } = useContext(CartContext);

  const onAdd = (quantityToAdd) => {
    setItemQuantity(quantityToAdd);
    addItem(item, itemQuantity);
  }; 

  return (
      <Card sx={{ p: 4, m: 5, mx: 70, maxWidth: 400, flexGrow: 1  }}>
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
              <Button component={Link} to="/cart" variant="contained" color="primary">
                Ver a carrito
              </Button>
              <br />
              <Button component={Link} to="/" variant="contained" color="primary">
                Seguir comprando
              </Button>
            </CardActions>
          )}
        </Typography>
        }
      </Card>
  );
};

export default ItemDetail;
