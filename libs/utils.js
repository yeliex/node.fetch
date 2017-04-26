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

const parseRequest = (url, options = { method: 'GET' }) => {
  const isGet = options.method === 'GET' || options.method === 'HEAD';

  options.json = options.json === false ? options.json : true;

  if (isGet && !options.query && options.data) {
    options.query = options.data;
  }
  if (!isGet && !options.body && options.data) {
    options.body = options.data;
  }

  const headers = new Headers(Object.assign({}, headersToObject(globalHeader), headersToObject(options.headers)));

  // handle Content-Type when not GET
  !isGet ? headers.set('Content-Type', headers.get('Content-Type') || mime(options.body, options.json)) : '';

  if (typeof options.body === 'object') {
    switch (headers.get('Content-Type')) {
      case mimetypes.form: {
        options.body = qs.stringify(options.body);
        break;
      }
      case mimetypes.formData: {
        const form = new FormData();
        Object.keys(options.body).forEach((key) => {
          form.set(key, options.body[key]);
        });
        options.body = form;
        break;
      }
      default: {
        options.body = JSON.stringify(options.body);
        break;
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

  return fetchRequest;
};

module.exports = {
  fetchDecorator
};
