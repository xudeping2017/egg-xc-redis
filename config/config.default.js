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
      password: 'dalitek@123',
      db: 1,
    },
    db2: {
      port: 6379,
      host: 'localhost',
      password: 'dalitek@123',
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

  config.i18n = {
    // 默认语言，默认 "en_US"
    defaultLocale: 'zh-CN',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };
  return config;
};
