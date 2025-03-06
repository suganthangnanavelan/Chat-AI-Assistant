const express = require('express');
const router = express.Router();
const Corpus = require('../models/corpus');
const { NlpManager } = require('@nlpjs/core');
let manager;
async() => {
  manager = new NlpManager({ languages: ['en'] });
};
// CREATE intent
router.post('/', async (req, res) => {
  try {
    const corpus = new Corpus(req.body);
    await corpus.save();
    res.status(201).send(corpus);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// READ all intents
router.get('/', async (req, res) => {
  try {
    const intents = await Corpus.find();
    res.status(200).send(intents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE intent by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCorpus = await Corpus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCorpus) return res.status(404).send('Intent not found');
    res.status(200).send(updatedCorpus);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE intent by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCorpus = await Corpus.findByIdAndDelete(req.params.id);
    if (!deletedCorpus) return res.status(404).send('Intent not found');
    res.status(200).send(deletedCorpus);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
