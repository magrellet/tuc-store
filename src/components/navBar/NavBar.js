import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import CartWidget from "./CartWidget";

const NavBar = () => {
  const categoryBasePath = "/category/";
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">
          <Link to="/"> Tuc Store e-commerce</Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link to="/">
            <Button color="inherit">Todos los Libros</Button>
          </Link>
          <Link to={`${categoryBasePath}1`}>
            <Button color="inherit">Libros en ingles</Button>
          </Link>
          <Link to={`${categoryBasePath}2`}>
            <Button color="inherit">Libros en castellano</Button>
          </Link>
            <CartWidget />
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
  );
};

export default NavBar;
