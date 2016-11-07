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
  if ((typeof body === 'object' || typeof query === 'object') && (!method || method === 'GET')) {
    const params = query || body;
    url += `${url.match(/\?/) ? '' : '?'}${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
  }

  return url;
};

const toFormData = (obj) => {
  const form = new FormData();
  Object.keys(obj).forEach((key)=> {
    form.append(key, obj[key]);
  });

  return form;
}

module.exports = {
  parseUrl,
  responseMiddleware,
  toFormData
};
