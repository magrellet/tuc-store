import React from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const EmptyCart = () => {
  return (
    <Paper id="id" sx={{ p: 4, m: 5, mx: 70, maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}></Grid>
      <Grid item>
        <Typography variant="subtitle1">
          El carrito esta vacio
          <br />
          <Button component={Link} to="/" variant="contained" color="primary">
            Agregar items a mi carrito
          </Button>
        </Typography>
      </Grid>
    </Paper>
  );
};

export default EmptyCart;
