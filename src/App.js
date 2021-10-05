import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/navBar/NavBar";
import ItemListContainer from "./components/container/ItemListContainer";
import ItemDetailContainer from "./components/container/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={ItemListContainer} />
          <Route path="/category/:id" component={ItemListContainer} />
          <Route path="/item/:id" component={ItemDetailContainer} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </CartProvider>
  );
};

export default App;
