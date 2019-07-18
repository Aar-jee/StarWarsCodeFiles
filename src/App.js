import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "react-bootstrap/dist/react-bootstrap.min.js"
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
      </header>
    </div>
  );
}

export default App;
