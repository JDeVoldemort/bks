const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  publisher: { type: String, required: true },
  edition: { type: String, required: true },
});

module.exports = mongoose.model('Request', requestSchema);
