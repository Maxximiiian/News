import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllNews from './AllNews';
import Auth from './auth/Auth';
import NotAuth from './auth/NotAuth';
import Registration from './auth/Registration';
import Home from './Home';

function App({ userSession }) {
  const [authState, setAuthState] = useState(userSession || null);

  return (
    <Routes>
      <Route index path="/" element={<Auth authState={authState} setAuthState={setAuthState} />} />
      <Route index path="/registration" element={<Registration setAuthState={setAuthState} />} />
      <Route index path="/news" element={<AllNews />} />
      <Route index path="/home" element={<Home />} />
      <Route index path="/notauth" element={<NotAuth />} />

    </Routes>
  );
}

export default App;
