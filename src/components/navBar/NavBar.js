import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

import CartWidget from "./CartWidget";
import BookImg from "../../assets/img/book-icon.png";

const NavBar = () => {
  const categoryBasePath = "/category/";
  const firstCategory = `${categoryBasePath}1`;
  const secondCategory = `${categoryBasePath}2`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/" sx={{ p: 1 }}>
            <img src={BookImg} alt="logo" loading="lazy" />
          </Typography>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Tuc Book Store
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button component={Link} to="/" color="inherit">
              Todos los Libros
            </Button>
            <Button component={Link} to={firstCategory} color="inherit">
              Libros en ingles
            </Button>
            <Button component={Link} to={secondCategory} color="inherit">
              Libros en castellano
            </Button>
            <Link to="/cart">
              <CartWidget />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
