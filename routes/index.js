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

module.exports = router;
