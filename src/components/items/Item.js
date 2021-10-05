import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Item = (props) => {
  const { item } = props;
  const itemDetailUrl = `/item/${item.id}`;

  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardHeader title={item.title} />
      <CardMedia component="img" title="image" src={item.img} />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {item.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={itemDetailUrl}>
          <Button size="small">
            Ver Detalle
          </Button>
        </Link>
        <IconButton aria-label="share">
        </IconButton>
      </CardActions>      
    </Card>
  );
};

export default Item;
