import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemDetail from "../items/ItemDetail";

import axios from "axios";

const ItemDetailContainer = () => {
  const [item, setItem] = useState("");

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/9e25fcd6-a045-42d5-9a19-08fedebcb414")
      .then((response) => setItem(response.data.filter((item) => item.id === 1)[0]));
  }, []);

  return (
    <div>{item !== "" ? <ItemDetail item={item} /> : <CircularProgress />}</div>
  );
};

export default ItemDetailContainer;
