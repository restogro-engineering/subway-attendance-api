const storeTypes = {
  ALL: 'ALL',
  COCO_BUILT: 'COCO BUILT',
  COCO_ACQUIRED: 'COCO ACQUIRED',
  FOFO: 'FOFO',
};

const allStores = Object.values(storeTypes);

const employeeStatus = {
  inStore: 'In store operations',
  training: 'Training',
  inactive: 'Inactive',
};

const allEmployeeStatuses = Object.values(employeeStatus);

module.exports = {
  storeTypes,
  allStores,
  employeeStatus,
  allEmployeeStatuses,
};
