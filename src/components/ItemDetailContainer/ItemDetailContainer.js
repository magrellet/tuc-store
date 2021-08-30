import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemDetail from "../items/ItemDetail";

import axios from "axios";

const ItemDetailContainer = ({ match }) => {
  let itemId = parseInt(match.params.id);
  const [item, setItem] = useState("");


  useEffect(() => {
    
    axios
      .get("https://mocki.io/v1/de181b41-132e-4ad3-ae3e-fbcbf501746c")
      .then((response) => {
        setTimeout(()=>{
          setItem(response.data.filter((item) => item.id === itemId)[0]);
        }, 1000);
      });
  }, [itemId]);

  return (
    <div>{item !== "" ? <ItemDetail item={item} /> : <CircularProgress />}</div>
  );
};

export default ItemDetailContainer;
