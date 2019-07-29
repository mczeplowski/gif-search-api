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

3. `
npm run server -- --pixabayApiKey=xxxxxxx --giphyApiKey=xxxxxxxx
`

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
