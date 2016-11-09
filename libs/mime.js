const types = require('./mime-types');

// detect mime type with data
const mime = (data, json) => {
  if (data instanceof FormData) {
    return types.formData;
  }
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
    return json ? types.json : types.form;
  }
  return types.text;
};