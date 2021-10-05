import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import CartWidget from "./CartWidget";

const NavBar = () => {
  const categoryBasePath = "/category/";
  const firstCategory = `${categoryBasePath}1`
  const secondCategory = `${categoryBasePath}2`
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h4" component={Link} to = "/" sx={{ flexGrow: 1 }}>
          Tuc Store e-commerce
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button component={Link} to="/" color="inherit">Todos los Libros</Button>
              <Button component={Link} to={firstCategory} color="inherit">Libros en ingles</Button>
              <Button component={Link} to={secondCategory} color="inherit">Libros en castellano</Button>            
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
