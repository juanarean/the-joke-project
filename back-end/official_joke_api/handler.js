const jokes = require('./jokes/index.json');

let lastJokeId = 0;
jokes.forEach(jk => jk.id = ++lastJokeId);

const types = Array.from(new Set(jokes.map(joke => joke.type)));

const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

/**
 * Get N random jokes from a jokeArray
 */
const randomN = (jokeArray, n) => {
  const limit = jokeArray.length < n ? jokeArray.length : n;
  const randomIndicesSet = new Set();

  while (randomIndicesSet.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    if (!randomIndicesSet.has(randomIndex)) {
      randomIndicesSet.add(randomIndex);
    }
  }

  return Array.from(randomIndicesSet).map(randomIndex => {
    return jokeArray[randomIndex];
  });
};

const randomTen = () => randomN(jokes, 10);

const randomSelect = (number) => randomN(jokes, number);

const jokeByType = (type, n) => {
  return randomN(jokes.filter(joke => joke.type === type), n);
};

const count = Object.keys(jokes).length;

/** 
 * @param {Number} id - joke id
 * @returns a single joke object or undefined
 */
const jokeById = (id) => (jokes.filter(jk => jk.id === id)[0]);

const jokesPage = (page, pageSize, query, sorting) => {
  const [key, order] = sorting.split(':');
  const offset = page * pageSize;

  const sortAlphaticaly = (a, b, order) => {
    if (order === 'desc') {
      if (a > b) {
        return -1
      }
      if (a < b) {
        return 1
      }
      return 0
    } else {
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      return 0
    }
  }

  const filteredJokes = jokes
    .sort((a, b) => {
      if (typeof a[key] === 'number') {
        if (order === 'desc') {
          return b[key] - a[key]
        }
        return a[key] - b[key]
      }
      return sortAlphaticaly(a[key], b[key], order)
    })
    .filter(joke => !query || joke.setup.toLowerCase().includes(query) || joke.type.toLowerCase().includes(query))

  return {
    jokes: filteredJokes.slice(offset, offset + pageSize),
    total: filteredJokes.length
  }
}

module.exports = { jokes, types, randomJoke, randomN, randomTen, randomSelect, jokeById, jokeByType, count, jokesPage };
