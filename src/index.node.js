"use strict";

const realFetch = require('isomorphic-fetch/fetch-npm-node.js');
const { responseMiddleware, parseUrl } = require('./utils');

let globalCallback = response => response;
let baseHost = '';

const fetchRequest = (url, options = {}, ...extras) => {
  options.data ? options.method === 'GET' ? options.query = { ...(options.query || {}), ...options.data } : options.body = { ...(options.body || {}), ...options.data } : '';

  if (!options.method || options.method === 'GET') {
    options.body = options.body || options.data;
  }

  options.headers = options.headers || {};
  if (options.headers['Content-Type'] !== 'application/json' && !(options.body instanceof FormData)) {
    // convert to FormData
    options.body = toFormData(options.body);
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

global.fetch = fetchRequest;

module.exports = fetchRequest;
