import nconf from 'nconf';
import apiKeys from '../api-keys.json';
import Server from './Server';

nconf.argv().defaults(apiKeys);

const port = nconf.get('port') || 8081;
const giphyApiKey = nconf.get('giphyApiKey');
const pixabayApiKey = nconf.get('pixabayApiKey');

const dataSources = [
  {
    url: `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=10&q=`,
    propertyNameOfResultsArray: 'data',
    resultMappingFunc: result => {
      const { url, height } = result.images.downsized_medium;
      return { url, height: +height };
    },
  },
  {
    url: `https://pixabay.com/api/?key=${pixabayApiKey}&per_page=10&q=`,
    propertyNameOfResultsArray: 'hits',
    resultMappingFunc: result => {
      const { webformatURL: url, imageHeight } = result;
      return { url, height: +imageHeight };
    },
  },
];

const server = new Server(dataSources, port);

server.run();
