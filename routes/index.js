const express       = require('express'),
      router        = express.Router();

// Landing Page
router.get('/', (req, res) => {
  res.render('landing');
});

// Index Page
router.get('/index', (req, res) => {
  res.render('index');
})

// Show Check-In Form
router.get('/in', (req, res) => {
  res.render('punchIn');
});

// Show Check-Out Form
router.get('/out', (req, res) => {
  res.render('punchOut');
});

module.exports = router;
