const getWeekFromDate = (date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
};

const getWeekDifferenceBetweenTwoDates = (date1, date2) => {
  return Math.round(Math.abs(date1 - date2) / (7 * 24 * 60 * 60 * 1000));
};

module.exports = {
  getWeekFromDate,
  getWeekDifferenceBetweenTwoDates,
};

// Two cases
//1.If week difference greter than 1 than throw error because its not possible to update attendance in this case
//2. If it is one than there are two cases
// 1. The date provided is less than current date, than date.getDay should be greter than or equal to three
// 2. The date provided is greater than current date, than date.getDay() should be less than or equal to 2
// foe every date setHours(0,0,0,0) this will ensure clarity while checking dates