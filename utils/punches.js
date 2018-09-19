const garbageHack = function(punches) {
	if (punches.length % 2 == 0) {
		console.log('Odd number of punches. Adding blank one at end.');
		punches.push({
			rawDate: '',
			date: '',
			time: '',
			type: ''
		});
	}
};

const punchLoop = function(punches) {
	let missingPunches = 0;
	timeBlocks = [];
	let i = 0;
	while (i < punches.length) {
		if (punches[i].type === 'in' && punches[i + 1].type === 'out') {
			timeBlocks.push({
				in: punches[i].rawDate,
				out: punches[i + 1].rawDate
			});
			i += 2;
		} else if (punches[i].type === 'in' && punches[i + 1].type === 'in') {
			// Handle if student did not punch out
			timeBlocks.push({
				in: punches[i].rawDate,
				out: 'Student did not punch out'
			});
			missingPunches++;
			// Only increment by 1, since a punch is missing
			i++;
		} else if (punches[i].type === 'out' && punches[i + 1].type === 'in') {
			timeBlocks.push({
				in: 'Student did not punch in',
				out: punches[i].rawDate
			});
			missingPunches++;
			// Only increment by 1, since a punch is missing
			i++;
		} else {
			// Stop the infinite loop, if it exists. Another terrible hack from the garbage programmer...
			missingPunches++;
			break;
		}
	}
	return {
		timeBlocks,
		missingPunches
	};
};

const newStudent = function(req) {
	return {
		_id: req.body.sid,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		faculty: req.body.faculty,
		sports: req.body.sports
	};
};

const getMonthPunches = function(punches) {
	let monthTime = 0;
	garbageHack(punches);

	// Loop through punches, putting them into blocks
	const punchData = punchLoop(punches);
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

	// Create new array of just current month punches
	const monthBlocks = timeBlocks.filter(block => {
		const currentMonth = new Date().getMonth();
		const punchMonth = block.in.getMonth();
		return punchMonth === currentMonth;
	});

	// Calculate time value of each block and add to monthTime
	monthBlocks.forEach(block => {
		datTime = block.out - block.in;
		// Check if time extends beyond 8 hours
		if (datTime >= (28800000)) {
			console.log("Month Time Error: One punch block was greater than 8 hours. Disregarded this likely error.");
			return
		} else {
			monthTime += datTime;
		}

	});
	monthTime = Math.round(monthTime / 60000);
	return {
		monthBlocks,
		monthTime
	};
};

module.exports = {
	punchLoop,
	newStudent,
	garbageHack,
	getMonthPunches
};
