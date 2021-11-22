import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bahan from "./components/Bahan";
import Header from "./components/Header";
import Login from "./components/Login";
import Request from "./components/Request";
import Resep from "./components/Resep";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="blank"></div>
        <Switch>
          <Route exact path="/" component={Request} />
          <Route path="/login" component={Login} />
          <Route path="/request" component={Request} />
          <Route path="/resep" component={Resep} />
          <Route path="/bahan" component={Bahan} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
