var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Request = require('../models/request');


router.get('/', async (req, res, next) => {
  try {
      const requests = await Request.find();

      res.status(200).json(requests);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const maxRequestId = await sequenceGenerator.nextId("requests");

    const request = new Request({
      id: maxRequestId,
      name: req.body.name,
      author: req.body.author,
      publishDate: req.body.publishDate,
      publisher: req.body.publisher,
      edition: req.body.edition
    });

    const createdRequest = await request.save();

    res.status(201).json({
      message: 'Request added successfully',
      request: createdRequest
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
});

router.put('/:id', (req, res, next) => {
  Request.findOne({ _id: req.params.id })
    .then(request => {
      request.name = req.body.name;
      request.author = req.body.author;
      request.publishDate = req.body.publishDate;
      request.publisher = req.body.publisher;
      request.edition = req.body.edition;

      Request.updateOne({ _id: req.params.id }, request)
        .then(result => {
          res.status(204).json({
            message: 'Request updated successfully'
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
      res.status(500).json({
        message: 'Request not found.',
        error: { request: 'Request not found'}
      });
    });
});
module.exports = router;
