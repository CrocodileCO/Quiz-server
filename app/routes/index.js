const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {getAllTopic,getTopicById, createTopic, removeTopic, updateTopic} = require('../controllers/indexController');

const router = new Router({
    prefix: '/api'
});

    router
        // topics
        .get('/topics',                     getAllTopic)
        .get('/topics/:topicId',            getTopicById)
        .post('/topics/',                   KoaBody(), createTopic)
        .patch('/topics/:topicId',          KoaBody(), updateTopic)
        .delete('/topics/:topicId',         removeTopic);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};
