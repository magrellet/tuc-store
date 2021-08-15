import React from "react";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function ItemCount() {
  const [itemCount, setItemCount] = React.useState(0);
  const itemStock = 25;

  const increateItems = () => {
    if (itemCount < itemStock) {
      setItemCount(itemCount + 1);
    }
  };

  const handleChange = () => {
    return itemCount;
  };

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={() => {
            setItemCount(Math.max(itemCount - 1, 0));
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <TextField
          label="Cantidad"
          variant="outlined"
          value={itemCount}
          color="primary"
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
}
