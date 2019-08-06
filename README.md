# gif-search-api
Service that allows to search gifs from two pages by phrase.

# How to run

You must install nodejs on your computer and get two api keys from services: giphy, pixabay.

Steps:

1. `
npm install
`

2. `
npm run compile
`

3. Create file 'api-keys.json' contains `{}` or api keys like in develop process.

4. If your 'api-keys.json' has empty object you must run `
npm run server -- --pixabayApiKey=xxxxxxx --giphyApiKey=xxxxxxxx
` but if you have api keys in this file you can run `npm run server`.

# How to develop

Steps:

1. `
npm install
`

2. You must create file 'api-keys.json' in main project catalog that contains
```json
{
  pixabayApiKey: xxxxx,
  giphyApiKey: xxxxx,
}
```

3. `
npm start
`

# How to add new data source

1. You must add config value API key of new service.

2. You must pass the value of API key to variable that will be used in the URL.

example:
```javascript
const giphyApiKey = nconf.get('giphyApiKey');
```

3. You must add new object to dataSources array.
Data source object model:

```json
{
  "url": "url to search endpoint with place at the end to paste phrase",
  "propertyNameOfResultsArray": "name of property with results array",
  "resultMappingFunc": "function that mapping result to format { url, height }",
},
```

example:
```javascript
{
  url: `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=10&q=`,
  propertyNameOfResultsArray: 'data',
  resultMappingFunc: result => {
    const { url, height } = result.images.downsized_medium;
    return { url, height: +height };
  },
},
```
