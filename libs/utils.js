const qs = require('qs');
const mime = require('../libs/mime');

let globalCallback = response => response;
let baseHost = '';

const responseMiddleware = (response) => {
  return response;
};

const parseUrl = (url, options, baseHost) => {
  const { ssl, method, query } = options;
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
    url += `${url.match(/\?/) ? '&' : '?'}${qs.stringify(query)}`
  }

  return url;
};

const parseRequest = (url, { method = 'GET', query = {}, data = {}, body = {}, headers = {}, json = false, ...extras } = {}) => {
  const isGet = method === 'GET' || method === 'HEAD';

  isGet ?
    (query = typeof query === 'object' ?
      { ...query, ...data, ...body } :
      (Object.keys(query).length === 0 ? data : query)) :
    (body = typeof body === 'object' && !(body instanceof FormData) ?
      { ...data, ...body } :
      (Object.keys(body).length === 0 && !(body instanceof FormData) ? data : body));

  headers = new Headers(headers);

  // handle Content-Type when not GET
  !isGet ? headers.set('Content-Type', headers.get('Content-Type') || mime(body)) && (body = qs.stringify(body)) : '';

  return {
    url: parseUrl(url, options, baseHost),
    options: {
      method,
      query,
      ...(!isGet ? body : {}),
      headers,
      ...extras
    }
  };
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
  };

  return fetchRequest;
};

module.exports = {
  fetchDecorator
};
