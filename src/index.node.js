"use strict";

const realFetch = require('node-fetch');

const { fetchDecorator } = require('./../libs/utils');

const fetch = fetchDecorator(realFetch);

fetch.fetch = fetch;

module.exports = fetch;

if(!global.fetch){
  global.fetch = realFetch;
  global.Response = realFetch.Response;
  global.Request = realFetch.Request;
  global.Headers = realFetch.Headers;
}
