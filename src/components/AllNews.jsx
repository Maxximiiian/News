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
    </>
  );
}
