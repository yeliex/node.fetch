const response = (method, data) => {
  return JSON.stringify(method, data);
};

module.exports = {
  response
};
