import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function AllNews({ authState }) {
  const [plyerState, setPlyerState] = useState(false);
  const [tagsState, setTagsState] = useState([]);
  const [news, setNews] = useState();
  const [text, setText] = useState([{ title: '', link: '' }]);
  // const [text2, setText2] = useState([]);
  // OBJjjjjjjjjjjjjj
  // console.log('text', text);
  // console.log('news', news);

  useEffect(() => {
    fetch('api/v1/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authState),
    })
      .then((res) => res.json()).then(async (resp) => {
        setTagsState(resp);
        return fetch('/api/v1/getnews').then((res) => (res.json())).then((data) => setNews((prev) => {
          setText((prevt) => {
            const text2 = data?.split('<item>').map((x) => x.match(/<link>( *.*)*<\/link>/gm)[0].slice(6, -7));
            const array2 = data?.split('<item>').map((x) => x.match(/<title>( *.*)*<\/title>/gm)[0].slice(7, -8))
              .map((title, ind) => ({ title, link: text2[ind] }))
            const array = data?.split('<item>').map((x) => x.match(/<title>( *.*)*<\/title>/gm)[0].slice(7, -8))
              .map((title, ind) => ({ title, link: text2[ind] }))
              .filter((el) => {
                for (let i = 0; i < resp.length; i += 1) {
                  if (el.title.includes(resp[i].tag)) { return true; }
                }
                return false;
              });
            console.log('TAGS', resp);
            console.log('texts array', array);
            if (array.length < 1) { return array2; }
            console.log(array2);
            return array;
          });
          return data;
        }));
      });
  }, []);

  const pleerHandler = (e) => {
    e.preventDefault();
    setPlyerState(!plyerState);
    console.log(plyerState);
  };

  // useEffect(() => {

  // }, []);

  // const text = news?.split('<item>').map((x) => x.match(/<title>( *.*)*<\/title>/gm)[0].slice(7, -8))
  //   .filter((el) => {
  //     for (let i = 0; i < tagsState.length; i += 1) {
  //       if (el.includes(tagsState[i].tag)) { return true; }
  //     }
  //     return false;
  //   });
  // .filter((x) => x.includes('Путин'));
  // const text2 = news?.split('<item>').map((x) => x.match(/<link>( *.*)*<\/link>/gm)[0].slice(6, -7));
  // console.log(tagsState, text);

  // const newTags = tagsState?.map((x) => x.tag);
  // const arr = [];
  // for (let index = 0; index < newTags?.length; index++) {
  //   const ell = text?.filter((x) => x.includes(newTags[index]));
  //   arr.concat(ell);
  // console.log(ell);
  // }
  // console.log((arr));

  // fetch юзэффектом на апишку и вывести данные мапом в ретерн

  return (
    <>
      <div className="container pt-3 mt-3">
        <div className="row">
          <div className="col-sm">
            {plyerState
              ? (
                <>
                  <div className="player" width="200">
                    <ReactPlayer className="zalupa container  rounded-3 py-3 item fixed" align="center" url="https://www.youtube.com/watch?v=vN-MX12xR-Y&ab_channel=%D0%9F%D0%B0%D0%B1%D0%BB%D0%B8%D0%BA%D0%A1%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D0%BE%D0%BC%D0%B0%D0%BD" />
                  </div>
                </>
              )
              : <></>}
            <button className="btnplyer" type="button" onClick={pleerHandler}>Музыка</button>
          </div>
          <div className="col-sm">
            div
            {text?.map((el, i) => (
              <div className="mx-auto mt-5" style={{ width: '500px' }}>
                <form className="container zalupa rounded-3 py-3 item" align="center">
                  <div className="mb-3">
                    <a href={`${el.link}`}>
                      <h2 className="charnews">{el.title}</h2>
                    </a>
                  </div>
                </form>

              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
