module.exports = {
	punchLoop: function(student, timeBlocks) {
		missingPunches = 0;
		let i = 0;
		while (i < student.punches.length) {
			if (
				student.punches[i].type === 'in' &&
				student.punches[i + 1].type === 'out'
			) {
				timeBlocks.push({
					in: student.punches[i].rawDate,
					out: student.punches[i + 1].rawDate
				});
				i += 2;
			} else if (
				student.punches[i].type === 'in' &&
				student.punches[i + 1].type === 'in'
			) {
				// Handle if student did not punch out
				timeBlocks.push({
					in: student.punches[i].rawDate,
					out: 'Student did not punch out'
				});
				missingPunches++;
				// Only increment by 1, since a punch is missing
				i++;
			} else if (
				student.punches[i].type === 'out' &&
				student.punches[i + 1].type === 'in'
			) {
				timeBlocks.push({
					in: 'Student did not punch in',
					out: student.punches[i].rawDate
				});
				missingPunches++;
				// Only increment by 1, since a punch is missing
				i++;
			} else {
				// Stop the infinite loop, if it exists. Another terrible hack from the trashcan-man "programmer"...
				missingPunches++;
				break;
			}
		}
		return missingPunches;
	},
	newStudent: function(req) {
		return {
			sid: req.body.sid,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			faculty: req.body.faculty,
			sports: req.body.sports
		};
	}
};
