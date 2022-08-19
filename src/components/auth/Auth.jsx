import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Auth({ authState, setAuthState }) {
  console.log(authState);

  const navigate = useNavigate();

  const [input, setInput] = useState({ email: '', password: '' });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const signInHandler = async (event) => {
    event.preventDefault();
    // console.log(input);
    const response = await fetch('/api/v1/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (response.ok) {
      const data = await response.json();
      setAuthState(data);
      navigate('/news');
    } else {
      alert('hui sosi');
      setInput({ email: '', password: '' });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form className="container zalupa rounded-3 py-3 item" align="center" onSubmit={signInHandler}>
        <div className="mb-3">
          <h2>Email</h2>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-3">
          <h2>Password</h2>
          <input
            onChange={changeHandler}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Your Password"
          />
        </div>
        <button type="submit" className="btn btn-danger">Sign in!</button>
        <div className="mx-auto mt-5">
          <h2>Don't register yet?</h2>
          <Link to="/registration" className="btn btn-danger">Registration</Link>
          <Link to="/news" className="btn btn-danger">СКИПАНУТЬ НА News</Link>
          <Link to="/home" className="btn btn-danger">СКИПАНУТЬ НА ХОУМ</Link>
        </div>
      </form>
    </div>
  );
}
// fetch na /auth
