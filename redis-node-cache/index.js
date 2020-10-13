const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
const setResponse = (username, repos) => {
  return `<h2>${username} has ${repos} Github repos</h2>`;
};

// Make request to Github for data
const getRepos = async (req, res, next) => {
  try {
    console.log('Fetching Data...');

    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const repos = data.public_repos;

    // Set data to Redis (using expiration as the data can change)
    // (key, seconds, data)
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// Cache middleware
const cache = (req, res, next) => {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
};

app.get('/repos/:username', cache, getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
