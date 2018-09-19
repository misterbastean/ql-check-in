const express = require('express'),
	router = express.Router(),
	moment = require('moment'),
	Student = require('../models/student');

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
	// Make sure entered ID is a number
	const isNum = /^\d+$/.test(req.body.sid)
	if (!isNum) {
		req.flash('error', "Student ID's should only be numbers");
		return res.redirect('/');
	}
	// Lookup student by sid
	Student.findOne({ _id: req.body.sid }, function(err, foundStudent) {
		if (err) {
			req.flash('error', 'Oh snap! Something went wrong when looking up that student ID in the database');
			res.redirect('/students/new');
		} else if (!foundStudent) {
			req.flash('error', "That ID has not been registered in this system yet.");
			res.redirect('/students/new');
		} else {
			const currentDate = moment();
			// Create new punch Object
			const newPunch = {
				rawDate: new Date(),
				date: currentDate.format('M-D-YYYY'),
				time: currentDate.format('h:mm a'),
				type: req.body.type
			};
			foundStudent.punches.push(newPunch); // 'student' var comes from the previous function that queried the DB
			foundStudent.save();
			if (newPunch.type === 'in') {
				req.flash('success', `${foundStudent.firstName} punched in successfully!`)
			} else if (newPunch.type === 'out') {
				req.flash('success', `${foundStudent.firstName} punched out successfully!`)
			}
			res.redirect('/');
		}
	});
});

module.exports = router;
