import React from 'react';

export default function AllNews() {
  // fetch юзэффектом на апишку и вывести данные мапом в ретерн
  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form className="container bg-secondary rounded-3 py-3 item" align="center">
        <div className="mb-3">
          <h2>Полученное значение 1</h2>
        </div>
        <div className="mb-3">
          <h2>Полученное значение 2</h2>
        </div>
        <div className="mx-auto mt-5">
          <h2>И.т.д...</h2>
        </div>
      </form>
    </div>
  );
}
