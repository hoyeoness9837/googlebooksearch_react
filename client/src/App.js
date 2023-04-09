import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Saved from './pages/Saved';
import { UserProvider } from './utils/GlobalState';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/saved' element={<Saved />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}
