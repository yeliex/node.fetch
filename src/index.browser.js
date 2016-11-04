const realFetch = require('isomorphic-fetch/fetch-npm-browserify.js');
const { responseMiddleware, parseUrl } = require('./utils');

let globalCallback = response => response;
let baseHost = '';

const fetchRequest = (url, options = {}, ...extras) => {
  options.body ? options.method === 'GET' ? options.query = {...(options.query || {}), ...options.body} : options.body = {...(options.body || {}), ...options.body} : '';

  options.body && !options.query && !options.body ? options.query = options.body = options.data : '';
  return realFetch.call(this, parseUrl(url, options, baseHost), options, ...extras).then(responseMiddleware).then(globalCallback);
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
