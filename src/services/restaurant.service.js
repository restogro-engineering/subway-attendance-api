const httpStatus = require('http-status');

const { Restaurant, Employee } = require('../models');
const ApiError = require('../utils/ApiError');

const createRestaurant = async (restaurantBody) => {
  if (await Restaurant.isEmailTaken(restaurantBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (await Restaurant.isCodeTaken(restaurantBody.restaurantCode)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant Code already taken');
  }
  return Restaurant.create(restaurantBody);
};

const getOneRestaurant = async (filter) => {
  return Restaurant.findOne({ ...filter, archive: false });
};

const createEmployee = async (employeeBody) => {
  const restaurant = await getOneRestaurant({ _id: employeeBody.restaurant });
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  return Employee.create(employeeBody);
};

const getRestaurantByEmail = async (email) => {
  return getOneRestaurant({ email });
};

const getRestaurantById = async (_id) => {
  return getOneRestaurant({ _id });
};

const updateRestaurantById = async (id, updateBody) => {
  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  if (updateBody.email && (await Restaurant.isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (updateBody.restaurantCode && (await Restaurant.isCodeTaken(updateBody.restaurantCode))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant code already taken');
  }

  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

module.exports = {
  createRestaurant,
  createEmployee,
  getOneRestaurant,
  getRestaurantByEmail,
  getRestaurantById,
  updateRestaurantById,
};
