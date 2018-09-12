const express       = require('express'),
      router        = express.Router(),
      moment        = require('moment'),
      Student       = require('../models/student');

// Show Check-In Form
router.get('/in', (req, res) => {
  res.render('punches/punchIn');
});

// Show Check-Out Form
router.get('/out', (req, res) => {
  res.render('punches/punchOut');
});

// Create new Punch
router.post('/punches', (req, res) => {
  // Lookup student by sid
  Student.findOne({sid: req.body.sid}, function (err, foundStudent) {
    if (err) {
      console.log("Problem with Student lookup: ", err);
      res.redirect('/students/new')
    } else {
      const currentDate = moment();
      // Create new punch Object
      const newPunch = {
        rawDate: new Date,
        date: currentDate.format('M-D-YYYY'),
        time: currentDate.format('h:mm a'),
        type: req.body.type
      };
      foundStudent.punches.push(newPunch); // 'student' var comes from the previous function that queried the DB
      foundStudent.save();
      res.redirect('/');
    }
  })
});

module.exports = router;
