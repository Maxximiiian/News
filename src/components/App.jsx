import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './auth/Auth';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Auth />} />
    </Routes>
  );
}

export default App;
