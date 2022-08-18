import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllNews from './AllNews';
import Auth from './auth/Auth';
import Registration from './auth/Registration';
import Home from './Home';

function App() {
  
  return (
    <Routes>
      <Route index path="/" element={<Auth />} />
      <Route index path="/registration" element={<Registration />} />
      <Route index path="/news" element={<AllNews />} />
      <Route index path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
