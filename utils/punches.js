module.exports = {
	punchLoop: function(punches) {
		let missingPunches = 0;
		timeBlocks = []
		let i = 0;
		while (i < punches.length) {
			if (
				punches[i].type === 'in' &&
				punches[i + 1].type === 'out'
			) {
				timeBlocks.push({
					in: punches[i].rawDate,
					out: punches[i + 1].rawDate
				});
				i += 2;
			} else if (
				punches[i].type === 'in' &&
				punches[i + 1].type === 'in'
			) {
				// Handle if student did not punch out
				timeBlocks.push({
					in: punches[i].rawDate,
					out: 'Student did not punch out'
				});
				missingPunches++;
				// Only increment by 1, since a punch is missing
				i++;
			} else if (
				punches[i].type === 'out' &&
				punches[i + 1].type === 'in'
			) {
				timeBlocks.push({
					in: 'Student did not punch in',
					out: punches[i].rawDate
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
		return {
			timeBlocks,
			missingPunches
		};
	},
	newStudent: function(req) {
		return {
			sid: req.body.sid,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			faculty: req.body.faculty,
			sports: req.body.sports
		};
	},
	garbageHack: function(punches) {
		if (punches.length % 2 == 0) {
			console.log('Odd number of punches. Adding blank one at end.');
			punches.push({
				rawDate: '',
				date: '',
				time: '',
				type: ''
			});
		}
	}
};
