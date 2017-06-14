const types = require('./mime-types');

// detect mime type with data
const mime = (data, json) => {
  if (typeof data === 'string') {
    try {
      if (JSON.parse(data)) {
        return types.json
      }
    } catch (e) {
      return types.text;
    }
  }
  if (typeof data === 'object') {
    return json !== false ? types.json : types.form;
  }
  return types.text;
};

module.exports = mime;
