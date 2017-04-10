"use strict";

const realFetch = require('isomorphic-fetch/fetch-npm-node.js');

const { fetchDecorator } = require('./../libs/utils');

const fetch = fetchDecorator(realFetch);

fetch.fetch = fetch;

module.exports = fetch;
