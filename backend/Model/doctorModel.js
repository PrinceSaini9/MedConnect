const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  availableTime: {
    type: String,
    required: true,
  },
  availableDays: {
    type: [String],
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
