const realFetch = require('isomorphic-fetch/fetch-npm-browserify.js');
require('../libs/polyfill')(window);
const { fetchDecorator } = require('./../libs/utils');

module.exports = {
  fetch: fetchDecorator(realFetch)
};
