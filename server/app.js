const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const specs = require('./data.json').specs;
const specRoutes = require('./routes/specRoutes');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const app = express();

// enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// connect to MongoDB Atlas
mongoose.connect(process.env.local.MONGODB_URL);
mongoose.connection.once('open', () => {
  console.log('connected to database');
  app.listen(4000, () => {
    console.log('listening on port 4000');
  });
});

// register template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// spec routes (scope)
app.use('/specs', specRoutes);

app.get('/', (req, res) => {
  res.redirect('/specs');
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
