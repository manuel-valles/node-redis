const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const redis = require('redis');

const port = process.env.PORT || 3000;

const app = express();

// View Engine (main method: main.handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
const publicPath = path.join(__dirname, './views');
app.use('/', express.static(publicPath));

app.get('/', (req, res, next) => {
  res.render('searchusers');
});

app.listen(port, () => console.log(`Server started on ${port}`));
