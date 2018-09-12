const express = require('express'),
	router = express.Router(),
	Student = require('../models/student'),
	punchUtils = require('../utils/punches');

// Show New Student Form
router.get('/students/new', (req, res) => {
	res.render('students/newStudent');
});

// Create New Student
router.post('/students/new', (req, res) => {
	const newStudent = punchUtils.newStudent(req);

	Student.create(newStudent, (err, student) => {
		if (err) {
			console.log('Error in student creation', err);
		} else {
			console.log('Student added to DB:');
			console.log(student);
		}
	});
	res.redirect('/');
});

// Show Posts for Individual Student
router.get('/students/:id', (req, res) => {
	// Get student
	Student.findOne({ sid: req.params.id }, (err, student) => {
		if (err) {
			console.log(err);
		} else {
			// Calculate total time
			let totalTime = 0; // Will be total time in milliseconds.
			// Merge punches into time blocks
			let timeBlocks = [];

			// BEGIN Terrible hack from a garbage programmer...
			// Check if there is at least 1 missing punch, then add blank item to array to stop error.
			if (student.punches.length % 2 == 0) {
				console.log('Odd number of punches. Adding blank one at end.');
				student.punches.push({
					rawDate: '',
					date: '',
					time: '',
					type: ''
				});
			}
			// END terrible hack from a horrendous programmer...

			// Loop through punches, putting them into blocks
			const missingPunches = punchUtils.punchLoop(student, timeBlocks);

			// Remove invalid time blocks (missing punch in or out)
			timeBlocks.forEach(block => {
				if (
					block.in == 'Student did not punch in' ||
					block.out == 'Student did not punch out'
				) {
					console.log('Missing punch -  no credit!');
					const index = timeBlocks.indexOf(block);
					timeBlocks.splice(index, 1);
				}
			});

			// Calculate time value of each block and add to totalTime
			timeBlocks.forEach(block => {
				datTime = block.out - block.in;
				totalTime += datTime;
			});
			totalTime = Math.round(totalTime / 60000);
			console.log('Total Time:', totalTime);
			console.log('Missing punches:', missingPunches);

			res.render('students/show', { student, totalTime });
		}
	});
});

module.exports = router;
