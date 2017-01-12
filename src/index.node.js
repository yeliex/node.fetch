"use strict";

const realFetch = require('isomorphic-fetch/fetch-npm-node.js');

global.Headers.prototype.keys = global.Headers.prototype.keys ||
  function () {
    return Object.keys(this._headers || {});
  };

global.Headers.prototype.values = global.Headers.prototype.values ||
  function () {
    return Object.keys(this._headers || {}).map((key) => this._headers[k]);
  };

const { fetchDecorator } = require('./../dist/utils');

const fetch = fetchDecorator(realFetch);

fetch.fetch = fetch;

module.exports = fetch;
