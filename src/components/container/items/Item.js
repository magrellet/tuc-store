import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
    paddingTop: "6%",
  },
}));

const Item = (props) => {
  const { item } = props;
  const classes = useStyles();

  const itemDetailUrl = `/item/${item.id}`;

  return (
    <Card className={classes.root}>
      <CardHeader title={item.title} />
      <CardMedia
        className={classes.media}
        component="img"
        title="image"
        image={item.img}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {item.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={itemDetailUrl}>
          <Button size="small">Ver Detalle</Button>
        </Link>
        <IconButton aria-label="share"></IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
