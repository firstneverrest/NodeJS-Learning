const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaptopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: false,
    },
    ram: {
      type: String,
      required: true,
    },
    disk: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// find collection
module.exports = mongoose.model('Laptop', LaptopSchema);
