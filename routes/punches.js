const express       = require('express'),
      router        = express.Router(),
      moment        = require('moment'),
      Punch         = require('../models/punch'),
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
  // console.log(req.body);
  // Lookup student by sid
  Student.findOne({sid: req.body.sid}, function (err, student) {
    if (err) {
      console.log("Problem with Student lookup: ", err);
      res.redirect('/students/new')
    } else {
      console.log("Student Object:");
      console.log(student);
      const currentDate = moment()
      // Create new punch Object
      const newPunch = {
        time: currentDate,
        type: req.body.type,
        sid: req.body.sid
      };
      Punch.create(newPunch, function (err, punch) {
        if (err) {
          console.log("Problem with punch creation:", err);
        } else {
          console.log("\n");
          console.log('2nd Student Object');
          console.log(student);
          // Associate punch with student
          student.punches.push(punch); // 'student' var comes from the previous function that queried the DB
          student.save();
          res.redirect('/');
        }
      })
    }
  })
});

module.exports = router;
