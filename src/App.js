import React from "react";
import "./App.css";
import DataManagement from "./components/DataManagement";
import About from "./components/About"
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <header className="Navbar">
        <Link to="/newspage">News</Link>
        <Link to="/about">About</Link>
      </header>
      <div className="App">
        <Switch>
          <Route path="/newspage" component={DataManagement} />
          <Route path="/about" component={About} />
          <Redirect to="/newspage"/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
