import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function AllNews({ authState }) {
  const [plyerState, setPlyerState] = useState(false);
  // console.log(authState);
  const [news, setNews] = useState();
  useEffect(() => {
    fetch('/api/v1/getnews').then((res) => (res.json())).then((data) => setNews(data));
  }, []);
  const text = news?.split('<item>').map((x) => x.match(/<title>( *.*)*<\/title>/gm));
  const text2 = news?.split('<item>').map((x) => x.match(/<link>( *.*)*<\/link>/gm));

  console.log(text, text2);

  const pleerHandler = (e) => {
    e.preventDefault();
    setPlyerState(!plyerState);
    console.log(plyerState);
  };

  // fetch юзэффектом на апишку и вывести данные мапом в ретерн
  return (
    <>
      {plyerState
        ? (
          <>
            <div className="player">
              <ReactPlayer className="container zalupa rounded-3 py-3 item" align="center" url="https://www.youtube.com/watch?v=pNU_ImrnyVU" />
            </div>
          </>
        )
        : <></>}
      <button className="btnplyer" type="button" onClick={pleerHandler}>Музыка</button>
      {text?.map((el, i) => (
        <div className="mx-auto mt-5" style={{ width: '400px' }}>
          <div style={{ height: '150px' }} />
          <form className="container bg-secondary rounded-3 py-3 item" align="center">
            <div className="mb-3">
              <h2 className="charnews">{text[i]}</h2>
            </div>
            <div className="mb-3">
              <h2 className="charnews">{text2[i]}</h2>
            </div>
            <div className="mx-auto mt-5">
              <h2>И.т.д...</h2>
            </div>
          </form>

        </div>
      ))}
    </>
  );
}
