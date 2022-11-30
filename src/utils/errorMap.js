const errorMap = {
  INVALID_VALUE: 400,
  UNMATCHED_FIELDS: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};