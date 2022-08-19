import React from 'react';
import { Link } from 'react-router-dom';

export default function NotAuth({ authState }) {
  console.log(authState);
  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form className="container bg-secondary rounded-3 py-3 item" align="center">
        <div className="mb-3">
          <h2>Вы не авторизованы...</h2>
        </div>
        <div className="mx-auto mt-5">
          <h2>Авторизируйтесь или зарегистрируйтесь</h2>
          <div>
            <Link to="/" className="btn btn-danger">Авторизация</Link>
          </div>
          <div className="pt-3">
            <Link to="/registration" className="btn btn-danger">Регистрация</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
