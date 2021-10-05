import React, { useContext } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../context/CartContext";

import { withStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const CartWidget = () => {
  console.log("temee1", theme.spacing(1))

  console.log("temee2", theme.spacing(2))

  const { totalQuantity } = useContext(CartContext);
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <ThemeProvider theme={theme}>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={totalQuantity} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </ThemeProvider>
  );
};

export default CartWidget;
