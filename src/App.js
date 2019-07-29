import express from 'express';

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
  res.send({ phrase: req.query.phrase });
}