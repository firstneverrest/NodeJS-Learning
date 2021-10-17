const express = require('express');
const specController = require('../controllers/specController');

const router = express.Router();

// get all specs
router.get('/', specController.spec_index);

// add a spec
router.post('/add-spec', specController.spec_create);

// get a single spec
router.get('/:id', specController.spec_single_detail);

// update a single spec
router.put('/:id', specController.spec_update);

// delete a single spec
router.delete('/:id', specController.spec_delete);

module.exports = router;
