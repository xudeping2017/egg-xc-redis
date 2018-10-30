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
      this._app.logger.info(`redis connect ${JSON.stringify(this._options.clients.db1)}`);
      conn = redis.createClient(this._options.clients.db1);
    } catch (error) {
      this._app.logger.error(error);
      throw new this._app.redisError(error.message);
    }
    return conn;
  }
  getConnInstance(db) {
    let conn = null;
    try {
      this._app.logger.info(`redis connect ${JSON.stringify(this._options.clients[db])}`);
      conn = redis.createClient(this._options.clients[db]);
    } catch (error) {
      this._app.logger.error(error);
      throw new this._app.redisError(error.message);
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

  async set(client, key, value, subvalue) {
    const setAsync = promisify(client.set).bind(client);
    const hmsetAsync = promisify(client.hmset).bind(client);
    const hsetAsync = promisify(client.hset).bind(client);
    switch (typeof value) {
      case 'string':
      case 'number':
        switch (typeof subvalue) {
          case 'undefined':
          case 'null':
            return await setAsync(key, value);
          default :
            return await hsetAsync(key, value, subvalue);
        }
      case 'object':
        return await hmsetAsync(key, value);
      default:
        this._app.logger.error('redis set value is', value);
        throw new this._app.redisError('redis set value is not string or object');
    }
  }
  async get(client, key, isObject, objectKey) {
    const getAsync = promisify(client.get).bind(client);
    if (!isObject) {
      return await getAsync(key);
    }
    const hgetallAsync = promisify(client.hgetall).bind(client);
    if (!objectKey) {
      return await hgetallAsync(key);
    }
    const hmgetAsync = promisify(client.hmget).bind(client);
    return await hmgetAsync(key, objectKey);
  }
  // 设置一个key的过期的秒数
  async expire(client, key, seconds) {
    const expireAsync = promisify(client.expire).bind(client);
    return await expireAsync(key, seconds);
  }
  // 查询一个key是否存在
  async exists(client, key) {
    const existsAsync = promisify(client.exists).bind(client);
    return await existsAsync(key);
  }
  async del(client, key) {
    const delAsync = promisify(client.del).bind(client);
    return await delAsync(key);
  }

}
module.exports = xcRedis;
