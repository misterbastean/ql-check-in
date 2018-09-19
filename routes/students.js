const express = require('express'),
	router = express.Router(),
	Student = require('../models/student'),
	punchUtils = require('../utils/punches'),
	middleware = require('../utils/middleware');

// Show New Student Form
router.get('/new', (req, res) => {
	res.render('students/newStudent');
});

// Create New Student
router.post('/new', (req, res) => {
	const newStudent = punchUtils.newStudent(req);

	Student.create(newStudent, (err, student) => {
		if (err) {
			console.log(err);
			if (err.code === 11000) {
				req.flash('error', "That student ID is already registered.");
				res.redirect('/')
			} else {
				req.flash('error', `Error in student creation: ${err.errmsg}`);
				res.redirect('/students/new')
			}

		} else {
			req.flash('success', 'Student added!')
			res.redirect('/');
		}
	});
});

// Show Punches for Individual Student
router.get('/:id', middleware.isLoggedIn, (req, res) => {
	// Get student
	Student.findOne({ _id: req.params.id }, (err, student) => {
		if (err) {
			console.log(err);
		} else if (student == null) {
			console.log("No student exists for that ID number");
			res.redirect('/')
		} else {
			// Calculate total time
			let totalTime = 0; // Will be total time in milliseconds.
		// Merge punches into time blocks
			// Check if there is at least 1 missing punch, then add blank item to array to stop error.
			punchUtils.garbageHack(student.punches);

			// Loop through punches, putting them into blocks
			const punchData = punchUtils.punchLoop(student.punches);
			const timeBlocks = punchData.timeBlocks;
			const missingPunches = punchData.missingPunches;

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
				// Check if time extends beyond 1 day - if so, do nothing
				if (datTime >= (28800000)) {
					console.log("Total Time Error: One punch block was greater than 8 hours. Disregarded this likely error.");
					return
				} else {
					totalTime += datTime;
				}
			});
			totalTime = Math.round(totalTime / 60000);

			// Get time for current monthTime
			const monthData = punchUtils.getMonthPunches(student.punches);
			const monthPunches = monthData.monthBlocks;
			const monthTime = monthData.monthTime;
			res.render('students/show', { student, totalTime, monthPunches, monthTime });
		};
	});
});

// Update Student Data

// Delete Student from DB
router.delete('/:id', (req, res) => {
	Student.deleteOne({ _id: req.params.id}, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	})
});
module.exports = router;
