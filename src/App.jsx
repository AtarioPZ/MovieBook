import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import RandomMovie from './components/randomMovie';
import PreNow from './components/preNow';
import Rent from './components/rent';
import Footer from './components/footer';
import Book from './components/book';

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
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <NavBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/preNow" element={<PreNow />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/book/:title/:year" element={<Book />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
