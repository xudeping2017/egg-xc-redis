# egg-xc-redis

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-xc-redis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-xc-redis
[travis-image]: https://img.shields.io/travis/eggjs/egg-xc-redis.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-xc-redis
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-xc-redis.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-xc-redis?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-xc-redis.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-xc-redis
[snyk-image]: https://snyk.io/test/npm/egg-xc-redis/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-xc-redis
[download-image]: https://img.shields.io/npm/dm/egg-xc-redis.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-xc-redis

<!--
Description here.
-->

## Install

```bash
$ npm i egg-xc-redis --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.xcRedis = {
  enable: true,
  package: 'egg-xc-redis',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.xcRedis = {
  {
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
针对配置可覆盖
```

see [config/config.default.js](config/config.default.js) for more detail.
##API
```js
 //获取redis链接 默认配置为db1
app.redis.getConn()

//获取链接实例 db为 db1,db2这种key值
app.redis.getConnInstance(db)

//释放redis链接 conn为redis链接
app.redis.doRelease(conn)

//统一设置赋值 conn为redis链接  key为键  
//value为string或object 
//value为string时
//subvalue为undefined则value为存储的值
//subvalue不为undefined则value为key对应对象的键,subvalue为该键的值
app.redis.set(conn, key, value,subvalue)

//统一获取值 conn为redis链接  key为键
// isObject和objectKey为undefined 时获取字符串值
// isObject为true，objectKey为undefined 时获取对象
// isObject为true，objectKey不为为undefined 时获取对象中objectKey对应的值
app.redis.get(conn, key,isObject, objectKey) 

 // 设置一个key的过期的秒数
app.redis.expire(conn, key, seconds)

// 查询一个key是否存在
app.redis.exists(conn, key)

//删除key
app.redis.del(conn, key)
 ```
## Example
赋值获取值
```js
    const conn = app.redis.getConn();
    await app.redis.set(conn, 'name', 'xiaoming');
    const result = await app.redis.get(conn, 'name');
    assert.equal(result, 'xiaoming');
    app.redis.doRelease(conn);
```
赋值获取对象
```js
   const conn = app.redis.getConn();
    await app.redis.set(conn, 'nameObj', { age: 12, job: 'programer' });
    const result = await app.redis.get(conn, 'nameObj', true,'job');
    app.logger.info('shoud get result get obj', result);
    assert.equal(result, 'programer');
    app.redis.doRelease(conn);
```
## Questions & Suggestions

Please open an issue [here](https://github.com/xudeping2017/egg-xc-redis/issues).

## License

[MIT](LICENSE)
