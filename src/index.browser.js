const realFetch = require('isomorphic-fetch/fetch-npm-browserify.js');
const { responseMiddleware, parseUrl, toFormData } = require('./../libs/utils');

let globalCallback = response => response;
let baseHost = '';

const fetchRequest = (url, options = {}, ...extras) => {
  options.data ? options.method === 'GET' ? options.query = { ...(options.query || {}), ...options.data } : options.body = { ...(options.body || {}), ...options.data } : '';

  if (!options.method || options.method === 'GET') {
    options.body = options.body || options.data;
  }

  // use object insteadof Header temporary
  options.headers = options.headers || {};
  if (options.headers['Content-Type'] !== 'application/json' && options.headers['Content-Type'] !== 'multipart/form-data' && !(typeof options.body === 'string') && !(options.body instanceof FormData)) {
    // convert to FormData
    options.body = toFormData(options.body);
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

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
