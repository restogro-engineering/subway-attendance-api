const httpStatus = require('http-status');
const { Employee, Attendance } = require('../models');
const ApiError = require('../utils/ApiError');
const { getWeekDifferenceBetweenTwoDates } = require('../utils/date');
const { storeConfig } = require('../config');
const getAttendanceByFilter = (filter) => {
  return Attendance.find({ archive: false, ...filter });
};

const getOneEmployee = async (filter) => {
  return Employee.findOne({ ...filter, archive: false });
};

const updateOneAttendance = async (filter, update) => {
  return Attendance.findOneAndUpdate({ ...filter, archive: false }, update, {
    new: true,
    upsert: true,
  });
};

const updateAttendance = async (updateBody, restaurant) => {
  const { fullTime, partTime } = updateBody;
  const curDate = new Date();
  curDate.setHours(0, 0, 0, 0);
  let updatedFullTimeData = fullTime.map(async (item) => {
    const { employee, details } = item;

    const employeeData = await getOneEmployee({ _id: employee });

    if (!employeeData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not Found');
    }

    if (employeeData.restaurant != restaurant) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Employee does not belongs to restaurant');
    }

    if (employeeData.type != storeConfig.employeeTypes.fullTime) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Employee is not a full time employee');
    }

    let finalData = details.map(async (item) => {
      const attendanceDate = new Date(item.attendanceDate);
      attendanceDate.setHours(0, 0, 0, 0);
      const attendanceDay = attendanceDate.getDay();
      const weekDifference = getWeekDifferenceBetweenTwoDates(attendanceDate, curDate);
      if (weekDifference > 1) {
        // If week difference greter than 1 than throw error
        throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
      } else if (weekDifference === 1) {
        if (attendanceDate > curDate) {
          if (attendanceDay > 2) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
          }
        } else {
          if (attendanceDay < 3) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
          }
        }
      }

      const updatedAttendance = await updateOneAttendance(
        { attendanceDate, employee, restaurant },
        { isPresent: item.isPresent }
      );
      return updatedAttendance;
    });
    finalData = await Promise.all(finalData);

    return {
      employee,
      details: finalData,
    };
  });

  updatedFullTimeData = await Promise.all(updatedFullTimeData);

  let updatedPartTimeData = partTime.map(async (item) => {
    const { employee, details } = item;

    const employeeData = await getOneEmployee({ _id: employee });

    if (!employeeData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Employee Not Found');
    }

    if (employeeData.restaurant != restaurant) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Employee does not belongs to restaurant');
    }

    if (employeeData.type != storeConfig.employeeTypes.partTime) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Employee is not a full time employee');
    }

    let finalData = details.map(async (item) => {
      const attendanceDate = new Date(item.attendanceDate);
      attendanceDate.setHours(0, 0, 0, 0);
      const attendanceDay = attendanceDate.getDay();
      const weekDifference = getWeekDifferenceBetweenTwoDates(attendanceDate, curDate);
      if (weekDifference > 1) {
        // If week difference greter than 1 than throw error
        throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
      } else if (weekDifference === 1) {
        if (attendanceDate > curDate) {
          if (attendanceDay > 2) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
          }
        } else {
          if (attendanceDay < 3) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry you can update only current week attendance');
          }
        }
      }

      const updatedAttendance = await updateOneAttendance(
        { attendanceDate, employee, restaurant },
        { hoursWorked: item.hoursWorked }
      );
      return updatedAttendance;
    });
    finalData = await Promise.all(finalData);

    return {
      employee,
      details: finalData,
    };
  });

  updatedPartTimeData = await Promise.all(updatedPartTimeData);
  return { updatedFullTimeData, updatedPartTimeData };
};

module.exports = { updateAttendance, getAttendanceByFilter };
