const express       = require('express'),
      router        = express.Router(),
      Student       = require('../models/student');

// Show New Student Form
router.get('/students/new', (req, res) => {
  res.render('students/newStudent');
});

// Create New Student
router.post('/students/new', (req, res) => {
  // console.log(req.body)
  const newStudent = {
    sid: req.body.sid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    faculty: req.body.faculty,
    sports: req.body.sports
  }
  Student.create(newStudent, (err, student) => {
    if (err) {
      console.log("Error in student creation", err);
    } else {
      console.log("Student added to DB");
      console.log(student);

    }
  })
  res.redirect('/');
})

// Show Posts for Individual Student
router.get('/students/:id', (req, res) => {
  res.render('students/show', {studentId: req.params.id})
})

module.exports = router;
