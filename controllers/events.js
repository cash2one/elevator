'use strict';
const views = require('co-views');
const parse = require('co-body');
const messages = [
  { id: 0,
    message: 'Elevator: the monitor for production events'
  }
];

const render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports.home = function *home(ctx) {
  this.body = yield render('list', { 'messages': messages });
};

module.exports.dailyProductionEvents = function *dailyProductionEvents(ctx) {
  //this.body = yield render('dp', { 'messages': messages });
  var data = JSON.parse(
    require('fs').readFileSync(
      require('path').resolve(
        __dirname, 'data/eventV4DailyProductionEventsCount.json'
      ),
      'utf8'
    ));
  this.body = data;
};
