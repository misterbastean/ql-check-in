const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	_id: Number,
	firstName: String,
	lastName: String,
	faculty: [String],
	sports: [String],
	punches: [{}]
});

module.exports = mongoose.model('Student', studentSchema);
