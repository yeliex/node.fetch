"use strict";

const realFetch = require('isomorphic-fetch/fetch-npm-node.js');
require('../libs/polyfill')(global);

const { fetchDecorator } = require('./../dist/utils');

const fetch = fetchDecorator(realFetch);

fetch.fetch = fetch;

module.exports = fetch;
