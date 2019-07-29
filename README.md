# gif-search-api
Service that allows to search gifs from two pages by phrase.

# How to run

You have to install nodejs on your computer and get two api keys from services: giphy, pixabay.

Steps:

1. `
npm install
`

2. `
npm run compile
`

3. Create file 'api-keys.json' contains `{}` or api keys like in develop process.

4. If your 'api-keys.json' has empty object you have to run `
npm run server -- --pixabayApiKey=xxxxxxx --giphyApiKey=xxxxxxxx
` but if you have api keys in this file you can run `npm run server`.

# How to develop

Steps:

1. `
npm install
`

2. You have to create file 'api-keys.json' contains `
{
  pixabayApiKey: xxxxx,
  giphyApiKey: xxxxx,
}
` in main project catalog.

3. `
npm start
`
