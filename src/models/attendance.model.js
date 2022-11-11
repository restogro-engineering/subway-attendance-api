const mongoose = require('mongoose');
const { workingHours } = require('../config/store');
const { toJSON, paginate } = require('./plugins');
const { v4 } = require('uuid');
const attendanceSchema = mongoose.Schema(
  {
    _id: { type: String, default: v4 },
    attendanceDate: {
      type: Date,
    },
    employee: {
      type: Number,
      ref: 'Employee',
      required: true,
    },
    restaurant: {
      type: Number,
      ref: 'Restaurant',
      required: true,
    },
    archive: {
      type: Boolean,
      default: false,
      private:true
    },
    isPresent: {
      type: Boolean,
    },
    hoursWorked: {
      type: Number,
      enum: workingHours,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
attendanceSchema.plugin(toJSON);
attendanceSchema.plugin(paginate);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
