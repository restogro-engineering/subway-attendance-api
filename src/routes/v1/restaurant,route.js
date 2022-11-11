const express = require('express');
const validate = require('../../middlewares/validate');

const { restaurantValidation } = require('../../validations');
const { restaurantController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create-employee', auth(), validate(restaurantValidation.createEmployee), restaurantController.createEmployee);
router.put(
  '/update-attendance',
  auth(),
  validate(restaurantValidation.updateAttendance),
  restaurantController.updateAttendance
);

router.get('/get-attendance', auth(), validate(restaurantValidation.getAttendance), restaurantController.getAttendance);
module.exports = router;
