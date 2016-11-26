const qs = require('qs');
const mime = require('../libs/mime');
const mimetypes = require('./mime-types');

let globalCallback = response => response;
let globalHeader = {};
let baseHost = '';

const responseMiddleware = (response) => {
  return response;
};

const headersToObject = (headers) => {
  return headers instanceof Headers ? (() => {
    return Array.from(headers.keys()).reduce((previous, currentKey) => {
      previous[currentKey] = headers.get(currentKey);
      return previous;
    }, {})
  })() : headers;
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

  const bodyIsFormData = typeof window === 'undefined' ? body instanceof FormData : false;

  isGet ? (query = typeof query === 'object' ?
    { ...query, ...data, ...body } :
    (Object.keys(query).length === 0 ? data : query)) :
    (body = typeof body === 'object' && !bodyIsFormData ?
      { ...data, ...body } :
      (Object.keys(body).length === 0 && !bodyIsFormData ? data : body));

  headers = new Headers({
    ...headersToObject(headers),
    ...headersToObject(globalHeader)
  });

  // handle Content-Type when not GET
  !isGet ? headers.set('Content-Type', headers.get('Content-Type') || mime(body)) : '';

  if (typeof body === 'object') {
    switch (headers.get('Content-Type')) {
      case mimetypes.form: {
        body = qs.stringify(body);
        break;
      }
      case mimetypes.formData: {
        const form = new FormData();
        Object.keys(body).forEach((key) => {
          form.set(key, body[key]);
        });
        body = form;
        break;
      }
      default: {
        break;
      }
    }
  }

  const options = {
    method,
    query,
    headers,
    ...extras
  };

  if (!isGet) {
    options.body = body;
  }

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
  };

  fetchRequest.headers = (header) => {
    if (typeof header !== 'object' && typeof header !== 'function') {
      throw new Error('global headers must be object or function');
    }
    globalHeader = header;

    delete fetchRequest.headers;
  };

  return fetchRequest;
};

module.exports = {
  fetchDecorator
};
