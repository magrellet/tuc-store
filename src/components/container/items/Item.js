import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ShareIcon from "@material-ui/icons/Share";
import ItemCount from "./ItemCount";
import { CardHeader } from "@material-ui/core";

export default function Item(props) {
  const { item } = props;
  const initialStock = 1;
  const maxStock = 25;
  const randomImageUrl = `https://source.unsplash.com/random/200x200?sig=${item.id}`;

  return (
    <Card className="Card" elevation={3}>
      <CardHeader title={item.title} />
      <CardMedia component="img" title="Paella dish" src={randomImageUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {item.body}
        </Typography>
      </CardContent>
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
  );
}
