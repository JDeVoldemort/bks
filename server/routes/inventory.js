var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Inventory = require('../models/inventory');

router.get('/', async (req, res, next) => {
    try {
        const inventorys = await Inventory.find();

        res.status(200).json(inventorys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res, next) => {
  try {
    const maxInventoryId = await sequenceGenerator.nextId("inventory");

    const inventoryItem = new Inventory({
      id: maxInventoryId,
      name: req.body.name,
      pages: req.body.pages,
      author: req.body.author,
      publishDate: req.body.publishDate,
      aquireDate: req.body.aquireDate,
      publisher: req.body.publisher,
      edition: req.body.edition
    });

    const createdInventoryItem = await inventoryItem.save();

    res.status(201).json({
      message: 'Inventory item added successfully',
      inventory: createdInventoryItem
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
});

router.put('/:id', (req, res, next) => {
  Inventory.findOne({ id: req.params.id })
    .then(inventoryItem => {
      inventoryItem.id = req.body.id;
      inventoryItem.name = req.body.name;
      inventoryItem.pages = req.body.pages;
      inventoryItem.author = req.body.author;
      inventoryItem.publishDate = req.body.publishDate;
      inventoryItem.aquireDate = req.body.aquireDate;
      inventoryItem.publisher = req.body.publisher;
      inventoryItem.edition = req.body.edition;

      console.log({req: req.body});

      Inventory.updateOne({ id: req.params.id }, inventoryItem)
        .then(result => {
          res.status(204).json({
            message: 'Inventory item updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
          message: 'An error occurred',
          error: error
      });
        });
    })
    .catch(error => {
      console.log({error: error});
      res.status(500).json({
        message: 'Inventory item not found.',
        error: { inventory: 'Inventory item not found'}
      });
    });
});


router.delete('/:id', (req, res, next) => {
    Inventory.findOne({ id: req.params.id })
      .then((inv) => {
        Inventory.deleteOne({ id: req.params.id })
          .then((result) => {
            res.status(204).json({
              message: "Inventory item deleted successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "There was a problem deleting the inventory item.",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Inventory item not found.",
          error: err,
        });
      });
});

module.exports = router;
