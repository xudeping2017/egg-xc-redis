'use strict';

/**
 * egg-xc-redis default config
 * @member Config#xcRedis
 * @property {String} SOME_KEY - some description
 */
const redis = {
  clients: {
    db1: { // instanceName. See below
      port: 6379, // Redis port
      host: 'localhost', // Redis host
      password: '',
      db: 1,
    },
    db2: {
      port: 6379,
      host: 'localhost',
      password: '',
      db: 2,
    },
  },
};

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539581142864_2141';
  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'INFO',
  };
  config.redis = redis;
  return config;
};
