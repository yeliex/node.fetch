const realFetch = require('isomorphic-fetch/fetch-npm-browserify.js');

const { fetchDecorator } = require('./../libs/utils');

module.exports = {
  fetch: fetchDecorator(realFetch)
};
