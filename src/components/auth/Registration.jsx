import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate()
  const [input, setInput] = useState({ email: '', password: '', repeat: '' });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const signUpHandler = async (event) => {
    event.preventDefault();
    if (input.password === input.repeat) {
      const response = await fetch('/api/v1/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      navigate('/news');
    } else {
      alert('LOH PIDR');
      setInput({ email: '', password: '', repeat: '' });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '250px' }} />
      <form onSubmit={signUpHandler} className="container bg-secondary rounded-3 py-3 item" align="center">
        <div className="mb-3">
          <h2>Email</h2>
          <input
            value={input.email}
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
            value={input.password}
            onChange={changeHandler}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Your Password"
          />
        </div>
        <div className="mb-3">
          <h2>Repeat Password</h2>
          <input
            value={input.repeat}
            onChange={changeHandler}
            type="password"
            name="repeat"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Repeat Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-danger">Sign up!</button>
          <Link to="/" class="btn btn-outline-danger float-left">←Back to Auth</Link>
        </div>
      </form>
    </div>
  );
}
