import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import NewsComponent from "./components/NewsComponent"
import DataManagement from "./components/DataManagement"

function App() {
  return (
    <div className="App">
      {/* Development Should proceed from the Data side first
      functional Individual News page // separate page
      functional NewsComponent in main page. (like the pokemon card)
      class MapView and Parser
      |--> method plotlocations 
      |--> method getlocations return latlong
      |--> method pullData from newsapi as json and set into state
      |--> call NewsComponent */}
      <DataManagement />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
