import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstCounter from './FirstCounter';
import SecondCounter from './SecondCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FirstCounter />
        <SecondCounter />
      </header>
    </div>
  );
}

export default App;
