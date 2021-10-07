const express = require('express');
const Spec = require('../models/laptop');

const router = express.Router();

// get all specs
router.get('/', (req, res) => {
  Spec.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add a spec
router.post('/add-spec', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndUpdate(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
