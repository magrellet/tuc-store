import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ShareIcon from "@material-ui/icons/Share";
import ItemCount from "./ItemCount";

import "./ItemListContainer.css";

export class ItemListContainer extends Component {
  render() {
    const initialStock = 1;
    const maxStock = 25;
    return (
      <div>
        <h2 className="ItemListTitle">Más Buscados</h2>
        <Card className="Card">
          <CardActionArea className="Card-Media">
            <CardMedia title="Lorem" component="src" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lorem ipsum
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                lacinia arcu ut ex pretium, non feugiat ipsum tempus. Nam sed
                diam vulputate, laoreet nunc quis, mattis tellus.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ItemCount initialStock={initialStock} maxStock={maxStock} />
            <Button size="small" color="primary">
              Agregar a Carrito
            </Button>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ItemListContainer;
