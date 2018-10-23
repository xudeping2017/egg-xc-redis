'use strict';
const xcRedis = require('./lib/xcRedis');
module.exports = app => {
  app.redis = new xcRedis(app);
};
