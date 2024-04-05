const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  id: { type: String, required: true },
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  publisher: { type: String, required: true },
  edition: { type: String, required: true },
});

module.exports = mongoose.model('Request', requestSchema);
