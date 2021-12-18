import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home_pg from './pages/Home_pg';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home_pg />} />
      </Routes>
    </div>
  );
}

export default App;
