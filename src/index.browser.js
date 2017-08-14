require('../libs/fetch');
const realFetch = self.fetch.bind(self);

const { fetchDecorator } = require('./../libs/utils');

module.exports = {
  fetch: fetchDecorator(realFetch)
};
