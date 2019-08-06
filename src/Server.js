import express from 'express';
import axios from 'axios';

function normalize(response, dataSource) {
  const { propertyNameOfResultsArray, resultMappingFunc } = dataSource;

  if (!propertyNameOfResultsArray || !resultMappingFunc) {
    throw new Error(
      'Your dataSource object model is not valid. Check README.md.',
    );
  }

  const resultsArray = response[propertyNameOfResultsArray];

  if (!resultsArray || typeof resultsArray !== 'object') {
    throw new Error(
      'Array with results is not found or not valid. You pass wrong parameter "propertyNameOfResultsArray".',
    );
  }

  return resultsArray.map(resultMappingFunc);
}

export default class Server {
  constructor(dataSources, port) {
    this.dataSources = dataSources;
    this.port = port;

    this.server = express();
  }

  run() {
    this.server
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .get('/search', this.search.bind(this))
      .listen(this.port, () => {
        console.log(`Server is listening on port ${this.port}`);
      });
  }

  async search(req, res) {
    if (!req.query.phrase) {
      return res.send({ error: 'Phrase not passed' });
    }

    const { phrase } = req.query;

    const promises = this.dataSources.map(source =>
      axios.get(`${source.url}${phrase}`),
    );

    let error = null;
    let data = [];

    try {
      data = await Promise.all(promises)
        .then(values => values.map(a => a.data))
        .then(values =>
          values.map((response, i) => normalize(response, this.dataSources[i])),
        )
        .then(values => values.reduce((a, value) => a.concat(value), []));
    } catch (e) {
      error = e.message;
    }

    if (error) {
      return res.status(500).send({ error });
    }

    return res.send({ phrase, data });
  }
}
