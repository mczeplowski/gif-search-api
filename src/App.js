import express from 'express';
import axios from 'axios';
import nconf from 'nconf';
import apiKeys from '../api-keys.json';

nconf.argv().defaults(apiKeys);

const giphyApiKey = nconf.get('giphyApiKey');
const pixabayApiKey = nconf.get('pixabayApiKey');

const port = 8081;
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/search', search)
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

async function search(req, res) {
  if (!req.query.phrase) {
    return res.send({ error: 'Phrase not passed' });
  }

  const { phrase } = req.query;

  const promises = [
    axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=10&q=${phrase}`,
    ),
    axios.get(
      `https://pixabay.com/api/?key=${pixabayApiKey}&per_page=10&q=${phrase}`,
    ),
  ];

  const data = await Promise.all(promises)
    .then(values => values.map(a => a.data))
    .then(values => values.map(normalize))
    .then(values => values.reduce((a, value) => a.concat(value), []));

  return res.send({ phrase, data });
}

function normalize(array) {
  if (!array.data && !array.hits) {
    return [];
  }

  if (array.data) {
    return array.data.map(gif => {
      const { url } = gif.images.downsized_medium;
      return { url };
    });
  }

  return array.hits.map(img => {
    const { webformatURL: url } = img;
    return { url };
  });
}
