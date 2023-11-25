import React from 'react';
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovie';
import PreNow from './components/preNow';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="container">
      <NavBar />
      <RandomMovie />      
      <PreNow />
      <Footer />
    </div>    
  );
}

export default App;
