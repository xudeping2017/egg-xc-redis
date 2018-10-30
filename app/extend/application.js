'use strict';
const redisError = Symbol('Application#redisError');
module.exports = {
    get redisError(){
        if (!this[redisError]) {
            this[redisError] = require('../../lib/redisError')(this);
          }
          return this[redisError];
    }
}