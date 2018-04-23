const http = require('http'),
      Koa = require('koa'),
      passport = require('koa-passport'), //реализация passport для Koa
      LocalStrategy = require('passport-local'), //локальная стратегия авторизации
      JwtStrategy = require('passport-jwt').Strategy, // авторизация через JWT
      ExtractJwt = require('passport-jwt').ExtractJwt, // авторизация через JWT;
      cors = require('@koa/cors'),
      config = require('config'),
      err = require('./helpers/error'),
     {routes, allowedMethods}  = require('./routes'),
      app = new Koa();

const jwtsecret = "mysecretkey"; // signing key for JWT

app.use(cors());
app.use(err);
// app.use(passport.initialize());
app.use(routes());
app.use(allowedMethods());

const server = http.createServer(app.callback()).listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});

module.exports = {
    closeServer() {
        server.close();
    }
};
