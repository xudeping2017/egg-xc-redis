'use strict';
const redis = require('redis');
const { promisify } = require('util');
class xcRedis {
  constructor(app) {
    this._app = app;
    this._options = this._app.config.redis;
  }
  set options(options) {
    this._options = options;
  }
  // 获取数据库连接
  getConn() {
    let conn = null;
    try {
      this._app.logger.info(`redis connect ${JSON.stringify(this._options.clients.db1)}`)
      conn = redis.createClient(this._options.clients.db1);
    } catch (error) {
      this._app.logger.error(error);
    }
    return conn;
  }
  getConnInstance(db) {
    let conn = null;
    try {
      this._app.logger.info(`redis connect ${JSON.stringify(this._options.clients[db])}`)
      conn = redis.createClient(this._options.clients[db]);
    } catch (error) {
      this._app.logger.error(error);
    }
    return conn;
  }
  // 释放连接
  doRelease(conn) {
    if (conn) {
      conn.quit(err => {
        if (!err) {
          this._app.logger.info('Redis release Success!');
        } else {
          this._app.logger.error(err);
        }
      });

    } else {
      this._app.logger.error('client is null. Redis release Error!');
    }
  }

  async set(client, key, value) {
    const setAsync = promisify(client.set).bind(client);
    const hmsetAsync = promisify(client.hmset).bind(client);
    switch (typeof value) {
      case 'string':
      case 'number':
        return await setAsync(key, value);
      case 'object':
        return await hmsetAsync(key, value);
      default:
        this._app.logger.error('redis set value is', value);
        throw new Error('redis set value is not string or object');
    }
  }
  async get(client, key, objectKey) {
    const getAsync = promisify(client.get).bind(client);
    const hmgetAsync = promisify(client.hmget).bind(client);
    if (!objectKey) {
      return await getAsync(key);
    }
    return await hmgetAsync(key, objectKey);
  }
}
module.exports = xcRedis;
