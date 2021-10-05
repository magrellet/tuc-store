import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ItemCount = (props) => {
  const { initialQuantity, maxStock, onAdd } = props;
  const [itemCount, setItemCount] = useState(initialQuantity);
  const itemStock = maxStock;

  const increateItems = (e) => {
    e.preventDefault();
    if (itemCount < itemStock) {
      setItemCount(itemCount + 1);
    }
  };

  const decreaseItems = (e) => {
    e.preventDefault();
    setItemCount(Math.max(itemCount - 1, 0));
  };

  useEffect(() => {
    onAdd(itemCount);
  }, [onAdd, itemCount]);

  return (
    <div>
      <ButtonGroup color="primary">
        <Button
          sx={{ p: 2, mx: 1 }}
          color="primary"
          onClick={(e) => {
            decreaseItems(e);
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
      </ButtonGroup>

      <TextField
        label="Cantidad"
        variant="outlined"
        value={itemCount}
        onChange={(e) => onAdd(e.target.value)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          onKeyDown: (e) => {
            e.preventDefault();
          },
        }}
      />
      <ButtonGroup color="primary">
        <Button
          sx={{ p: 2, mx: 1 }}
          color="primary"
          onClick={(e) => {
            increateItems(e);
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ItemCount;
