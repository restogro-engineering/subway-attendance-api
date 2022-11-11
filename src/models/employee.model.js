const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { storeConfig } = require('../config');
const employeeSchema = mongoose.Schema(
  {
    _id: { type: Number },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    status: {
      type: String,
      enum: storeConfig.employeeStatusList,
    },
    type: {
      type: String,
      enum: storeConfig.employeeTypeList,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    ctc: {
      type: String,
    },
    restaurant: {
      type: Number,
      ref: 'Restaurant',
      required: true,
    },
    archive: {
      type: Boolean,
      private: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
employeeSchema.plugin(toJSON);
employeeSchema.plugin(paginate);
employeeSchema.plugin(AutoIncrement, { id: 'employee_counter' });
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
employeeSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
