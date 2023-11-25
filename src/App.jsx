// App.js
import React from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import RandomMovie from './components/randomMovie';
import PreNow from './components/preNow';
import Rent from './components/rent';
import Footer from './components/footer';

import './App.css';

function Index() {
  return (
    <>
      <RandomMovie />
      <PreNow />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/preNow" element={<PreNow />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
