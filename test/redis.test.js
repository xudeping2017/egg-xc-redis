'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe(__filename, () => {
  it('shoud get result get str', async () => {
    const conn = app.redis.getConn();
    await app.redis.set(conn, 'name', 'xiaoming');
    const result = await app.redis.get(conn, 'name');
    assert.equal(result, 'xiaoming');
    app.redis.doRelease(conn);
  });
  it('shoud get result get obj', async () => {
    const conn = app.redis.getConn();
    await app.redis.set(conn, 'nameObj', { age: 12, job: 'programer' });
    const result = await app.redis.get(conn, 'nameObj', true, 'job');
    app.logger.info('shoud get result get obj', result);
    assert.equal(result, 'programer');
    app.redis.doRelease(conn);
  });
  it('shoud get result get db', async () => {
    const conn1 = app.redis.getConnInstance('db1');
    const conn2 = app.redis.getConnInstance('db2');
    await app.redis.set(conn1, 'nameObj', { age: 12, job: 'programer11' });
    await app.redis.set(conn2, 'nameObj', { age: 13, job: 'programer22' });
    const result1 = await app.redis.get(conn1, 'nameObj', true, 'job');
    const result2 = await app.redis.get(conn2, 'nameObj', true, 'job');
    app.logger.info('shoud get result get obj result1', result1);
    app.logger.info('shoud get result get obj result2', result2);
    assert.equal(result1, 'programer11');
    assert.equal(result2, 'programer22');
    app.redis.doRelease(conn1);
    app.redis.doRelease(conn2);
  });
  it('shoud get Error', async () => {
    assert(app.redis.doRelease(null) !== null);
    assert(app.redis.doRelease({
      quit(cb) {
        cb(new Error('111'));
      },
    }) !== null);
    const conn = app.redis.getConn();
    try {
      app.redis.set(conn, 'name', undefined);
    } catch (err) {
      assert(err !== null);
    }
    app.redis.doRelease(conn);
    app.redis.options = undefined;
    assert(app.redis.getConn() === null);
    assert(app.redis.getConnInstance('db2') === null);
  });
});

