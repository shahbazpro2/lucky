import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Contact_pg from './pages/Contact_pg';
import Detail_pg from './pages/Detail_pg';
import Home_pg from './pages/Home_pg';
import Pool_pg from './pages/Pool_pg';
import Wallet_pg from './pages/Wallet_pg';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container mx-auto px-20'>
        <Routes>
          <Route path="/" element={<Home_pg />} />
          <Route path="/detail" element={<Detail_pg />} />
          <Route path="/wallet" element={<Wallet_pg />} />
          <Route path="/pool" element={<Pool_pg />} />
          <Route path="/contact" element={<Contact_pg />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
