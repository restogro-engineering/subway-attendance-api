const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService, attendanceService } = require('../services');
const pick = require('../utils/pick');

const createEmployee = catchAsync(async (req, res) => {
  res.send(await restaurantService.createEmployee({ ...req.body, restaurant: req.user._id }));
});

const updateAttendance = catchAsync(async (req, res) => {
  const updatedAttendance = await attendanceService.updateAttendance(req.body, req.user._id);
  res.send(updatedAttendance);
});

const getAttendance = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['startDate', 'endDate']);

  const attendanceFilter = {
    attendanceDate: { $gte: new Date(filter.startDate), $lte: new Date(filter.endDate) },
    restaurant: req.user._id,
  };

  const data = await attendanceService.getAttendanceByFilter(attendanceFilter);
  res.send(data);
});

module.exports = {
  createEmployee,
  updateAttendance,
  getAttendance,
};
