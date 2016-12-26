'use strict';
const views = require('co-views');
const parse = require('co-body');
const messages = [
  { id: 0,
    message: 'Elevator'
  },
  { id: 1,
    message: 'The monitor for production events'
  }
];

const render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports.home = function *home(ctx) {
  this.body = yield render('list', { 'messages': messages });
};
