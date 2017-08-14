const realFetch = require('../libs/fetch');

const { fetchDecorator } = require('./../libs/utils');

module.exports = {
  fetch: fetchDecorator(realFetch)
};
