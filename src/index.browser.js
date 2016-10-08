const realFetch = require('isomorphic-fetch/fetch-npm-browserify.js');
const { responseMiddleware, parseUrl } = require('./utils');

let globalCallback = response => response;
let baseHost = '';

const fetchRequest = (url, options = {}, ...extras) => {
  return realFetch.call(this, parseUrl(url, options), options, ...extras).then(responseMiddleware).then(globalCallback);
};

fetchRequest.callback = (callback) => {
  if (typeof callback === 'function') {
    globalCallback = callback;
  }
  delete fetchRequest.callback;
};

fetchRequest.baseHost = (host) => {
  baseHost = host;
};

module.exports = {
  fetch: fetchRequest
};
