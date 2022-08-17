import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllNews from './AllNews';
import Auth from './auth/Auth';
import Registration from './auth/Registration';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Auth />} />
      <Route index path="/registration" element={<Registration />} />
      <Route index path="/news" element={<AllNews />} />
    </Routes>
  );
}

export default App;
