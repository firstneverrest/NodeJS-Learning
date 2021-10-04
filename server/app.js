const express = require('express');
const morgan = require('morgan');
const specs = require('./data.json').specs;

const app = express();

// register template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', specs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-me', (req, res) => {
  res.redirect('about');
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
