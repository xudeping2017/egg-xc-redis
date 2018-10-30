'use strict';

module.exports = function(app) {
    const ctx = app.createAnonymousContext();
    const dbError = app.dbError;
    class redisError extends dbError {
        constructor(info,content){
            super(info,content);
            //20001 redis Error错误码
            this._code = this._code + 1;
            this._message = ctx.__('errorRedis');
        }
    }
    return redisError;
}