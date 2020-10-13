const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const redis = require('redis');

// Create Redis Client
const client = redis.createClient();

client.on('connect', () => console.log('Connected to Redis'));

const port = process.env.PORT || 3000;

const app = express();

// View Engine (main method: main.handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const publicPath = path.join(__dirname, './views');
app.use('/', express.static(publicPath));

// Search Page
app.get('/', (req, res, next) => {
  res.render('searchusers');
});

// Search Processing
app.post('/user/search', (req, res, next) => {
  const { id } = req.body;

  client.hgetall(id, (err, obj) => {
    if (!obj) {
      res.render('searchusers', {
        error: 'User does not exist',
      });
    } else {
      obj.id = id;
      res.render('details', {
        user: obj,
      });
    }
  });
});

// Add User Page
app.get('/user/add', (req, res, next) => {
  res.render('adduser');
});

// Add User Processing
app.post('/user/add', (req, res, next) => {
  const { id, first_name, last_name, email, phone } = req.body;

  client.hmset(
    id,
    [
      'first_name',
      first_name,
      'last_name',
      last_name,
      'email',
      email,
      'phone',
      phone,
    ],
    (err, reply) => {
      if (err) {
        console.error(err);
      }
      console.log(reply);
      res.redirect('/');
    }
  );
});

app.listen(port, () => console.log(`Server started on ${port}`));
