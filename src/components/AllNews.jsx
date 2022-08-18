import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { load } from 'cheerio';

const axios = require('axios');
const cheerio = require('cheerio');

export default function AllNews({ authState }) {
  const [news, setNews] = useState();
  useEffect(() => {
    fetch('/api/v1/getnews').then((res) => (res.json())).then((data) => setNews(data));
  }, []);

  const url = 'http://www.vedomosti.ru/newsline/out/rss.xml';
  axios.get(url)
    .then((response) => {
      console.log(response.data);
    })
    .cath((error) => {
      console.log(error);
    });


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
