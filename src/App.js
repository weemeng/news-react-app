import React from "react";
import "./App.css";
import DataManagement from "./components/DataManagement";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Test from "./components/Testing/TestingMain";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <header className="Navbar">
        <Link to="/newspage">News</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/test">Test</Link>
      </header>
      <div className="App">
        <Switch>
          <Route path="/newspage" component={DataManagement} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={Test} />
          <Redirect to="/newspage" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
