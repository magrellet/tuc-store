import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  return (
    <Container maxWidth="sm" className="Container">
      <Grid container spacing={3}>
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
          <Typography variant="h5" color="textSecondary">
            {item.body}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Precio: {item.price}
          </Typography>
        </Typography>
      </Grid>
    </Container>
  );
};

export default ItemDetail;
