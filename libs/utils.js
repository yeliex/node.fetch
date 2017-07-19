const qs = require('qs');
const mime = require('../libs/mime');
const mimetypes = require('./mime-types');

let globalCallback = response => response;
let globalHeader = {};
let baseHost = '';
let globalParams = {};
let globalQuery = {};

const responseMiddleware = (response) => {
  return response;
};

const headersToObject = (headers) => {
  return headers instanceof Headers ? (() => {
    return Array.from(headers.keys()).reduce((previous, currentKey) => {
      previous[currentKey] = headers.get(currentKey);
      return previous;
    }, {});
  })() : headers;
};

const urlParamsReg = new RegExp(/(:([a-zA-Z0-9-_]{1,}))/g);

const formatParams = (url, params = {}) => {
  return url.replace(urlParamsReg, (rk, ____, k) => params[k] || rk);
};

const parseUrl = (url, options, baseHost) => {
  const { ssl, method, query } = options;

  url = formatParams(url, options.params);

  if (typeof baseHost === 'function') {
    return baseHost(url, options);
  }

  if (typeof baseHost === 'string') {
    url = url.replace(/^\/\//, baseHost);
  }
  if (/^\/\//.test(url)) {
    url = `${ssl ? 'https' : 'http'}:${url}`;
  }
  if (query) {
    url += `${url.match(/\?/) ? '&' : '?'}${qs.stringify(query)}`;
  }

  return url;
};

const parseRequest = (url, options = { method: 'GET' }) => {
  options.method = (options.method || 'GET').toUpperCase();

  const isGet = options.method === 'GET' || options.method === 'HEAD';

  options.json = options.json === false ? options.json : true;

  if (isGet && !options.query && options.data) {
    options.query = options.data;
  }
  if (!isGet && !options.body && options.data) {
    options.body = options.data;
  }
  if (isGet && options.body) {
    console.warn(`[Autofetch]: Request with GET/HEAD method cannot have body, ingored.`);
    delete options.body;
  }

  options.params = Object.assign({}, globalParams, options.params);
  options.query = Object.assign({}, globalQuery, options.query);

  const headers = new Headers(Object.assign({}, headersToObject(globalHeader), headersToObject(options.headers)));

  if (!(typeof FormData === 'object' && options.body instanceof FormData)) {
    // handle Content-Type when not GET
    !isGet ? headers.set('Content-Type', headers.get('Content-Type') || mime(options.body, options.json)) : '';
    if (typeof options.body === 'object') {
      switch (headers.get('Content-Type')) {
        case mimetypes.form: {
          options.body = qs.stringify(options.body);
          break;
        }
        default: {
          options.body = JSON.stringify(options.body);
          break;
        }
      }
    }
  }

  options.headers = headers;

  return [
    parseUrl(url, options, baseHost),
    options
  ];
};

const fetchDecorator = (realFetch) => {
  const fetchRequest = (...request) => {
    return realFetch.call(this, ...parseRequest(...request)).then(responseMiddleware).then(globalCallback);
  };

  fetchRequest.callback = (callback) => {
    if (typeof callback === 'function') {
      globalCallback = callback;
    }
    delete fetchRequest.callback;
  };

  fetchRequest.baseHost = (host) => {
    baseHost = host;

    delete fetchRequest.baseHost;
  };

  fetchRequest.headers = (header) => {
    if (typeof header !== 'object' && typeof header !== 'function') {
      throw new Error('global headers must be object or function');
    }
    globalHeader = header;

    delete fetchRequest.headers;
  };

  fetchRequest.params = (params) => {
    globalParams = params;

    delete  fetchRequest.params;
  };

  fetchRequest.query = (query) => {
    globalQuery = query;

    delete  fetchRequest.query;
  };

  return fetchRequest;
};

module.exports = {
  fetchDecorator
};
