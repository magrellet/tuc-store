import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import CartWidget from "./CartWidget";

import "./NavBar.css";

const NavBar = () => {
  const categoryBasePath = "/category/";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">
          <Link to="/"> Tuc Store e-commerce</Link>
        </Typography>
        <section className="Menu-Button">
          <Link to="/">
            <Button color="inherit">Todos los Libros</Button>
          </Link>
          <Link to={`${categoryBasePath}1`}>
            <Button color="inherit">Libros en ingles</Button>
          </Link>
          <Link to={`${categoryBasePath}2`}>
            <Button color="inherit">Libros en castellano</Button>
          </Link>
          <Button color="inherit">
            <CartWidget />
          </Button>
        </section>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
