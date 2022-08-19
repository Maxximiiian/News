import React, { useEffect, useState } from 'react';

export default function Home({ authState }) {
  const [input, setInput] = useState({ tagName: '', authState });
  // const [isFavorite, setIsFavorite] = useState('');
  const [tagsState, setTagsState] = useState([]);

  // const handleChange = (event) => {
  //   setIsFavorite(event.target.value);
  // };

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const addTagHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/v1/createtag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = await response.json();
    console.log(data);
    setTagsState(data);
    // console.log(data);
    setInput({ tagName: '', authState });
    console.log(input);
    // , tagChoise: 'false'
    setIsFavorite('');
  };
  useEffect(() => {
    fetch('api/v1/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authState),
    })
      .then((res) => res.json()).then((resp) => setTagsState(resp));
  }, []);

  const deleteHandler = async (event, el) => {
    event.preventDefault();
    console.log(el);
    const response = await fetch(`/api/v1/delete/${el.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(el),
    });
    if (response.ok) {
      setTagsState((prev) => prev.filter((element) => element.id !== el.id));
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
              <form className="container zalupa rounded-3 py-3 item" align="center">
                <div className="mb-3">
                  <h2>Что я хочу видеть?</h2>
                  <div className="col">
                    {tagsState.map((el) => ((el.isFavorite) ? (
                      <div className="mt-3">
                        {el.tag}
                        {' '}
                        <button onClick={(event) => deleteHandler(event, el)} type="delete" className="btn btn-danger">Удалить</button>
                      </div>
                    ) : (<></>)))}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
              <form onSubmit={addTagHandler} className="container zalupa rounded-3 py-3 item" align="center">
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
                      // checked={isFavorite === 'true'}
                      // onChange={handleChange}
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
                      // checked={isFavorite === 'false'}
                      // onChange={handleChange}
                    />
                    <label htmlFor="contactChoice2">Добавить в черный список</label>
                  </div>
                </div>
                <button type="submit" className="btn">Добавить</button>
              </form>
            </div>
          </div>
          <div className="col-sm">
            <div className="align-top mx-auto mt-5" style={{ width: '400px' }}>
              <form className="container zalupa rounded-3 py-3 item" align="center">
                <div className="mb-3">
                  <h2>Что я не хочу видеть?</h2>
                  <div className="col">
                    {tagsState.map((el) => ((!el.isFavorite) ? (
                      <div className="mt-3">
                        {el.tag}
                        {' '}
                        <button onClick={(event) => deleteHandler(event, el)} type="delete" className="btn btn-danger">Удалить</button>
                      </div>
                    ) : (<></>)))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
