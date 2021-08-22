import "./App.css";
import NavBar from "./components/navBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

const App = () => {
  return (
    <div>
      <NavBar />
      <ItemDetailContainer />
      <ItemListContainer />
    </div>
  );
};

export default App;
