import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AllNews({ authState }) {
  // console.log(authState);
  const [news, setNews] = useState();
  useEffect(() => {
    fetch('/api/v1/getnews').then((res) => (res.json())).then((data) => setNews(data));
  }, []);
  const text = news?.split('<item>').map((x) => x.match(/<title>( *.*)*<\/title>/gm)[0].slice(7, -8));
  const text2 = news?.split('<item>').map((x) => x.match(/<link>( *.*)*<\/link>/gm)[0].slice(6, -7));

  console.log(text, text2);
  // fetch юзэффектом на апишку и вывести данные мапом в ретерн
  return (
    <>
      {text?.map((el, i) => (
        <div className="mx-auto mt-5" style={{ width: '400px' }}>
          <form className="container zalupa rounded-3 py-3 item" align="center">
            <div className="mb-3">
              <a href={`${text2[i]}`}>
                <h2 className="charnews">{text[i]}</h2>
              </a>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}
