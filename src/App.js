import "./App.css";
import Bahan from "./components/Bahan";
import Header from "./components/Header";
import Login from "./components/Login";
import Request from "./components/Request";
import Resep from "./components/Resep";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="blank"></div>
      {/* <Login /> */}
      {/* <Request /> */}
      {/* <Resep /> */}
      <Bahan />
    </div>
  );
}

export default App;
