const express = require('express');
const router = express.Router();
const Essay = require('../models/Essay');
const auth = require('../middleware/auth');

// @route   GET api/essays
// @desc    Get all essays
// @access  Public
router.get('/', async (req, res) => {
  try {
    const essays = await Essay.find().sort({ createdAt: -1 });
    res.json(essays);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/essays/:id
router.get('/:id', async (req, res) => {
  try {
    const essay = await Essay.findById(req.params.id);
    if (!essay) return res.status(404).json({ msg: 'Essay not found' });
    res.json(essay);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Essay not found' });
    res.status(500).send('Server Error');
  }
});

// @route   POST api/essays
// @desc    Create an essay
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newEssay = new Essay({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    });
    const essay = await newEssay.save();
    res.json(essay);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        msg: Object.values(err.errors)
          .map((e) => e.message)
          .join(' '),
      });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/essays/:id
// @desc    Update an essay
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const essay = await Essay.findById(req.params.id);
    if (!essay) return res.status(404).json({ msg: 'Essay not found' });
    
    essay.title = req.body.title || essay.title;
    essay.content = req.body.content || essay.content;
    essay.category = req.body.category || essay.category;

    await essay.save();
    res.json(essay);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/essays/:id
// @desc    Delete an essay
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const essay = await Essay.findById(req.params.id);
    if (!essay) return res.status(404).json({ msg: 'Essay not found' });

    await essay.deleteOne();
    res.json({ msg: 'Essay removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
