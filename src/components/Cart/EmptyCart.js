import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "4%",
    margin: "5%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexGrow: 1,
    maxWidth: "500px",
  },
}));

const EmptyCart = () => {
  const classes = useStyles();
  return (
    <Paper id="id" className={classes.paper}>
      <Grid item>
        <Typography variant="body1">El carrito esta vacio</Typography>

        <br />
        <Button component={Link} to="/" variant="contained" color="primary">
          Agregar items a mi carrito
        </Button>
      </Grid>
    </Paper>
  );
};

export default EmptyCart;
