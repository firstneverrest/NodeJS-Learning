const Spec = require('../models/laptop');

const spec_index = (req, res) => {
  Spec.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const spec_single_detail = (req, res) => {
  const id = req.params.id;
  Spec.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const spec_create = (req, res) => {
  const spec = new Spec(req.body);

  spec
    .save()
    .then((result) => {
      res.send({ message: 'add spec successfully' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const spec_update = (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndUpdate(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const spec_delete = (req, res) => {
  const id = req.params.id;
  Spec.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  spec_index,
  spec_create,
  spec_single_detail,
  spec_update,
  spec_delete,
};
