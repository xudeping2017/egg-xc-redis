'use strict';

const mock = require('egg-mock');

describe('test/xc-redis.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/xc-redis-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, xcRedis')
      .expect(200);
  });
});
