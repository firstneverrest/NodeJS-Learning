const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const specs = require('./data.json').specs;
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const Spec = require('./models/Laptop');

const app = express();

// enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL);
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

// get all specs
app.get('/specs', (req, res) => {
  Spec.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add a spec
app.post('/add-spec', (req, res) => {
  const spec = new Spec(req.body);

  spec
    .save()
    .then((result) => {
      res.send({ message: 'add spec successfully' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get a single spec
app.get('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete a single spec
app.delete('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update a single spec
app.put('/specs/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndUpdate(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/specs');
});

app.get('/specs', (req, res) => {
  Spec.find()
    .sort({ createAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Home', specs: result });
    })
    .catch((err) => {
      console.log(err);
    });
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
