const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  pages: { type: Number, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  aquireDate: { type: String, required: true },
  publisher: { type: String, required: true },
  edition: { type: String, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
