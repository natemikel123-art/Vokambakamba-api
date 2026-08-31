const express = require('express');
const router = express.Router();
const grammar = require('../data/grammar.json');

// GET /api/languages
// Returns a list of all available languages
router.get('/languages', (req, res) => {
  const languages = Object.keys(grammar).map(key => ({
    code: grammar[key].code,
    language: grammar[key].language,
    region: grammar[key].region,
    family: grammar[key].family,
    available_topics: Object.keys(grammar[key].topics)
  }));

  res.json({
    success: true,
    count: languages.length,
    data: languages
  });
});

// GET /api/grammar/:lang
// Returns all grammar topics for a language
router.get('/:lang', (req, res) => {
  const lang = req.params.lang.toLowerCase();

  if (!grammar[lang]) {
    return res.status(404).json({
      success: false,
      message: `Language "${lang}" not found. Available: ${Object.keys(grammar).join(', ')}`
    });
  }

  const { language, code, region, family, topics } = grammar[lang];

  res.json({
    success: true,
    language,
    code,
    region,
    family,
    available_topics: Object.keys(topics),
    data: topics
  });
});

// GET /api/grammar/:lang/:topic
// Returns a specific grammar topic for a language
router.get('/:lang/:topic', (req, res) => {
  const lang = req.params.lang.toLowerCase();
  const topic = req.params.topic.toLowerCase();

  if (!grammar[lang]) {
    return res.status(404).json({
      success: false,
      message: `Language "${lang}" not found. Available: ${Object.keys(grammar).join(', ')}`
    });
  }

  const topics = grammar[lang].topics;

  if (!topics[topic]) {
    return res.status(404).json({
      success: false,
      message: `Topic "${topic}" not found for ${grammar[lang].language}. Available: ${Object.keys(topics).join(', ')}`
    });
  }

  res.json({
    success: true,
    language: grammar[lang].language,
    topic,
    data: topics[topic]
  });
});

module.exports = router;
