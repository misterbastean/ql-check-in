const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  sid: Number,
  firstName: String,
  lastName: String,
  faculty: [String],
  sports: [String],
  punches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Punch"
  }]
})

module.exports = mongoose.model("Student", studentSchema);
