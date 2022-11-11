const Joi = require('joi');
const { storeConfig } = require('../config');

const createEmployee = {
  body: Joi.object().keys({
    name: Joi.string(),
    designation: Joi.string(),
    status: Joi.string().valid(...storeConfig.employeeStatusList),
    type: Joi.string()
      .required()
      .valid(...storeConfig.employeeTypeList),
    startDate: Joi.date(),
    endDate: Joi.date(),
    ctc: Joi.string(),
  }),
};

const fullTimeEmployeeSchema = Joi.object().keys({
  isPresent: Joi.boolean().required(),
  attendanceDate: Joi.date().required(),
});

const partTimeEmployeeSchema = Joi.object().keys({
  hoursWorked: Joi.number()
    .required()
    .valid(...storeConfig.workingHours),
  attendanceDate: Joi.date().required(),
});

const updateAttendance = {
  body: Joi.object().keys({
    fullTime: Joi.array()
      .items(
        Joi.object().keys({
          employee: Joi.number().required(),
          details: Joi.array().items(fullTimeEmployeeSchema).min(0),
        })
      )
      .min(0)
      .required(),
    partTime: Joi.array()
      .items(
        Joi.object().keys({
          employee: Joi.number().required(),
          details: Joi.array().items(partTimeEmployeeSchema).min(0),
        })
      )
      .min(0)
      .required(),
  }),
};

const getAttendance = {
  query: Joi.object().keys({
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
};

module.exports = {
  createEmployee,
  updateAttendance,
  getAttendance,
};
