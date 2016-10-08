const responseMiddleware = (response) => {
  return response;
};

const parseUrl = (url, { ssl, method, body, query }, baseHost) => {
  if (typeof baseHost === 'function') {
    url = baseHost(url);
  }
  if (typeof baseHost === 'string') {
    url.replace(/^\/\//, baseHost);
  }
  if (/^\/\//.test(url)) {
    url = `${ssl ? 'https' : 'http'}:${url}`;
  }
  if ((typeof body === 'object' || typeof query === 'object') && (!method || method === 'GET')) {
    url += `${url.match(/\?/) ? '' : '?'}${Object.keys(query || body).map(key => `${key}=${body[key]}`).join('&')}`
  }

  return url;
};

module.exports = {
  parseUrl,
  responseMiddleware
};
