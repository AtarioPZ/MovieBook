import React from 'react';
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovie';
import PreNow from './components/preNow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <RandomMovie />
      
      <PreNow />
    </div>
  );
}

export default App;
