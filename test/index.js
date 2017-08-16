const child_process = require('child_process');
const assert = require('assert');
const utils = require('./utils');
require('../src/index.node');

describe('Initial test', () => {
  it('start server', () => {
    child_process.fork('./test/server.js');
  });
  describe('set callback', () => {
    fetch.callback((response) => {
      it('ok', response.ok);
      return response;
    });
  });
  describe('set basehost', () => {
    fetch.baseHost('http://localhost:30000');
  });
});

describe('Normal test', () => {
  it('Get', () => {
    fetch(`//`).then((response)=>{
      console.log(response)
    })
  });
});

