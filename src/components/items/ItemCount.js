import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const ItemCount = (props) => {
  const { initialQuantity, maxStock, onAdd } = props;
  const [itemCount, setItemCount] = useState(initialQuantity);
  const itemStock = maxStock;

  const increateItems = () => {
    if (itemCount < itemStock) {
      setItemCount(itemCount + 1);      
    }
  };

  const decreaseItems = () => {
    setItemCount(Math.max(itemCount - 1, 0));
  };

  useEffect(() => {
    onAdd(itemCount);
 }, [itemCount, onAdd]);

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={() => {
            decreaseItems();
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
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
        <Button
          onClick={() => {
            increateItems();
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ItemCount;
