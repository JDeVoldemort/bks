const Sequence = require('../models/sequence');

let sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      sequenceId = sequence._id;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err;
    }
  },

  async nextId(collectionType) {
    if (!sequenceId) {
      await this.init();
    }

    let updateObject = {};
    let nextId;

    try {
      switch (collectionType) {
        case 'inventory':
          const maxInventoryId = await this.nextInventoryId();
          nextId = maxInventoryId.toString();
          updateObject = { maxInventoryId: maxInventoryId };
          break;
        case 'favorites':
          const maxFavoriteId = await this.nextFavoriteId();
          nextId = maxFavoriteId.toString();
          updateObject = { maxFavoriteId: maxFavoriteId };
          break;
        case 'requests':
          const maxRequestId = await this.nextRequestId();
          nextId = maxRequestId.toString();
          updateObject = { maxRequestId: maxRequestId };
          break;
        default:
          return -1;
      }

      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });

      return nextId;
    } catch (err) {
      console.log("nextId error = " + err);
      return null;
    }
  },

  async nextInventoryId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxInventoryId: 1 } }, { new: true });
    return sequence.maxInventoryId;
  },

  async nextFavoriteId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxFavoriteId: 1 } }, { new: true });
    return sequence.maxFavoriteId;
  },

  async nextRequestId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxRequestId: 1 } }, { new: true });
    return sequence.maxRequestId;
  }
};

module.exports = sequenceGenerator;
