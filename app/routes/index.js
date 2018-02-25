const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {  getAllTopic,getTopicById, createTopic, removeTopic, updateTopic,
        getAllQuestion, getQuestionById, createQuestion, removeQuestion, updateQuestion,
        getAllQuestionsByTopic, getRandomQuestionsByTopic, incrementQuantityAnswer, parseArtistStyle,
        getAllArtist, getArtistById, createArtist, removeArtist, updateArtist,
        getArtStyles, createArtStyle
    } = require('../controllers/apiController');

const router = new Router({
    prefix: '/api'
});

    router
        // topics
        .get('/topics',                             getAllTopic)
        .get('/topics/:topicId',                    getTopicById)
        .post('/topics/',                           KoaBody(), createTopic)
        .patch('/topics/:topicId',                  KoaBody(), updateTopic)
        .delete('/topics/:topicId',                 removeTopic)
        // questions
        .get('/questions',                          getAllQuestion)
        .get('/questions/:questionId',              getQuestionById)
        .post('/questions/',                        KoaBody(), createQuestion)
        .patch('/questions/:questionId',            KoaBody(), updateQuestion)
        .delete('/questions/:questionId',           removeQuestion)
        .get('/questions/:questionId/inc_quantity', incrementQuantityAnswer)
        // topic - question
        .get('/topics/:topicId/questions',          getAllQuestionsByTopic)
        .get('/topics/:topicId/rnd',                KoaBody(),getRandomQuestionsByTopic)
        
        // >>> Recommender system <<<
        // artists
        .get('/rs/artists',                         getAllArtist)
        .get('/rs/artists/:artistId',               getArtistById)
        .post('/rs/artists/',                       KoaBody(), createArtist)
        .patch('/rs/artists/:artistId',             KoaBody(), updateArtist)
        .delete('/rs/artists/:artistId',            removeArtist)
        // artStyle
        .get('/rs/artstyles',                       getArtStyles)
        .post('/rs/artstyles/',                     KoaBody(), createArtStyle);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};
