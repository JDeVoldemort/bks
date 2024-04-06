const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxInventoryId: {type: Number, require: true},
    maxRequestId: {type: Number, require: true},
    maxFavoriteId: {type: Number, require: true}
});

module.exports = mongoose.model("Sequence", sequenceSchema);
