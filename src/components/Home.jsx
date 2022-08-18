import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState({ tagName: '' });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const addTagHandler = async (event) => {
    event.preventDefault();
    // console.log(input);
    const response = await fetch('/api/v1/createtag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  };
  return (
    <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '250px' }} />
      <form onSubmit={addTagHandler} className="container bg-secondary rounded-3 py-3 item" align="center">
        <div className="mb-3">
          <h2>Добавить тег</h2>
          <input
            value={input.tagName}
            onChange={changeHandler}
            type="text"
            name="tagName"
            className="form-control"
            id="tagName"
            aria-describedby="tagName"
            placeholder="Введите тег"
          />
        </div>
        <div className="radios">
          <div className="col">
            <input
              onChange={changeHandler}
              type="radio"
              id="favoritIsTrue"
              name="tagChoise"
              value="true"
            />
            <label htmlFor="contactChoice1">Добавить в любимые</label>
          </div>
          <div className="col">
            <input
              onChange={changeHandler}
              type="radio"
              id="favoritIsFalse"
              name="tagChoise"
              value="false"
            />
            <label htmlFor="contactChoice2">Добавить в черный список</label>
          </div>
        </div>
        <button type="submit" className="btn btn-danger mt-3">Добавить</button>
      </form>
    </div>
  );
}
