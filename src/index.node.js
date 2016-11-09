"use strict";

const realFetch = require('isomorphic-fetch/fetch-npm-node.js');
const { fetchDecorator } = require('./../dist/utils');

module.exports = fetchDecorator(realFetch);
