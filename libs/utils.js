const qs = require('qs');

const responseMiddleware = (response) => {
  return response;
};

const parseUrl = (url, { ssl, method, body, query }, baseHost) => {
  if (typeof baseHost === 'function') {
    url = baseHost(url);
  }
  if (typeof baseHost === 'string') {
    url = url.replace(/^\/\//, baseHost);
  }
  if (/^\/\//.test(url)) {
    url = `${ssl ? 'https' : 'http'}:${url}`;
  }
  if ((typeof body === 'object' || typeof query === 'object') && (!method || method === 'GET' || method === 'HEAD')) {
    const params = query || body || {};
    url += `${url.match(/\?/) ? '' : '?'}${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
  }

  return url;
};

const toFormData = (obj = {}) => {
  return qs.stringify(obj);
};

module.exports = {
  parseUrl,
  responseMiddleware,
  toFormData
};
