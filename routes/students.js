const express       = require('express'),
      router        = express.Router();

// Show New Student Form
router.get('/students/new', (req, res) => {
  res.render('students/newStudent');
});

// Create New Student
router.post('/students/new', (req, res) => {
  res.send('New Student POST route');
})

// Show Posts for Individual Student
router.get('/students/:id', (req, res) => {
  res.render('students/show', {studentId: req.params.id})
})

module.exports = router;
