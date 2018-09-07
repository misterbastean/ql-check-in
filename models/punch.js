const mongoose = require('mongoose');

const punchSchema = new mongoose.Schema({
  time: Object,
  type: String,
  sid: Number
})

module.exports = mongoose.model("Punch", punchSchema);
