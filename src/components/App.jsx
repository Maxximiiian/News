import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllNews from './AllNews';
import Auth from './auth/Auth';
import NotAuth from './auth/NotAuth';
import Registration from './auth/Registration';
import Home from './Home';
import Navbar from './Navbar';

function App({ userSession }) {
  const [authState, setAuthState] = useState(userSession || null);

  return (
    <>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route index path="/" element={<Auth authState={authState} setAuthState={setAuthState} />} />
        <Route index path="/registration" element={<Registration authState={authState} setAuthState={setAuthState} />} />
        <Route index path="/news" element={<AllNews authState={authState} />} />
        <Route index path="/home" element={<Home authState={authState} />} />
        <Route index path="/notauth" element={<NotAuth authState={authState} />} />
      </Routes>
    </>
  );
}

export default App;
