import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import CartWidget from "./CartWidget";

import "./NavBar.css";

class NavBar extends Component {
  render() {
    const menuItems = ["Marcas", "Productos", "Sale!"];
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Tuc Store e-commerce</Typography>
          <section className="Menu-Button">
            {menuItems.map((item, i) => {
              return <Button color="inherit">{item}</Button>;
            })}
            <Button color="inherit">
              <CartWidget />
            </Button>
          </section>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
