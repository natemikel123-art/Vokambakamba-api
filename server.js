const express = require('express');
const cors = require('cors');
const grammarRoutes = require('./routes/grammar');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root — API info
app.get('/', (req, res) => {
  res.json({
    name: 'VOKAMBAKAMBA API',
    version: '1.0.0',
    description: 'Zambian Language Grammar API',
    endpoints: {
      'GET /api/languages': 'List all available languages',
      'GET /api/grammar/:lang': 'Get all grammar topics for a language (e.g. /api/grammar/bemba)',
      'GET /api/grammar/:lang/:topic': 'Get a specific topic (e.g. /api/grammar/bemba/noun_classes)'
    },
    available_languages: ['bemba', 'nyanja', 'tonga'],
    available_topics: ['noun_classes', 'verb_conjugation', 'sentence_structure', 'tones', 'adjectives']
  });
});

// Routes
app.use('/api/grammar', grammarRoutes);
app.use('/api', grammarRoutes); // also mounts /api/languages here

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found. Visit / for available endpoints.'
  });
});

app.listen(PORT, () => {
  console.log(`VOKAMBAKAMBA API running on port ${PORT}`);
});
