import React, { useState } from 'react';

export default function Home({ authState }) {
  const [input, setInput] = useState({ tagName: '', authState });
  const [tagsState, setTagsState] = useState([]);

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const addTagHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/v1/createtag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    setTagsState(data);
    // console.log(data);
  };
  console.log(tagsState, tagsState[0]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
              <form className="container bg-secondary rounded-3 py-3 item" align="center">
                <div className="mb-3">
                  <h2>Что я хочу видеть?</h2>
                  <div className="col">
                    {tagsState.map((el) => (
                      <div>{el.tag}</div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
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
          </div>
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
              <form className="container bg-secondary rounded-3 py-3 item" align="center">
                <div className="mb-3">
                  <h2>Что я не хочу видеть?</h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
