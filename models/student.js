const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  sid: Number,
  firstName: String,
  lastName: String,
  notifications: [String],
  punches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Punch"
  }]
})

module.exports = mongoose.model("Student", studentSchema);
