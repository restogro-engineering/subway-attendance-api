const storeTypes = {
  ALL: 'ALL',
  COCO_BUILT: 'COCO BUILT',
  COCO_ACQUIRED: 'COCO ACQUIRED',
  FOFO: 'FOFO',
};

const allStoreTypeList = Object.values(storeTypes);

const employeeStatuses = {
  inStore: 'In store operations',
  training: 'Training',
  inactive: 'Inactive',
};

const employeeStatusList = Object.values(employeeStatuses);

const employeeTypes = {
  fullTime: 'Full Time',
  partTime: 'Part Time',
};

const employeeTypeList = Object.values(employeeTypes);

const workingHours = [0, 2, 4, 6, 8];

module.exports = {
  storeTypes,
  allStoreTypeList,
  employeeStatuses,
  employeeStatusList,
  employeeTypes,
  employeeTypeList,
  workingHours,
};
