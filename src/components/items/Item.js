import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ShareIcon from "@material-ui/icons/Share";
import { CardHeader } from "@material-ui/core";

const Item = (props) => {
  const { item } = props;
  const itemDetailUrl = `/item/${item.id}`;

  return (
    <Card className="Card" elevation={3}>
      <CardHeader title={item.title} />
      <CardMedia component="img" title="image" src={item.img} />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {item.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={itemDetailUrl}>
          <Button size="small" color="primary">
            Ver Detalle
          </Button>
        </Link>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>      
    </Card>
  );
};

export default Item;
