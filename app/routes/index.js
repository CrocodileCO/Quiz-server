const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {  getAllTopic,getTopicById, createTopic, removeTopic, updateTopic,
        getAllQuestion, getQuestionById, createQuestion, removeQuestion, updateQuestion,
        getAllQuestionsByTopic, getRandomQuestionsByTopic, incrementQuantityAnswer, parseArtistStyle,
        getAllArtist, getArtistById, createArtist, removeArtist, updateArtist,
        getArtStyles, createArtStyle, getSimilarArtists, getAllGroups, getGroupById, createGroup, updateGroup, removeGroup, getQuestionDb
    } = require('../controllers/apiController'),
    {   getQuestionsGen, removeQuesionGen, getRecSystemByTopic, createRecSystem, updateRecSystem, removeRecSystem, getCriterionsByRecSystem, getRecValuesByRecSystem,
        getCriterionById, createCriterion, updateCriterion, removeCriterion,
        createCriterionValue, updateCriterionValue, removeCriterionValue,
        createRecValue, updateRecValue, removeRecValue} = require('../controllers/genController');

const router = new Router({
    prefix: '/api'
});

    router
        // groups
        .get('/groups',                             getAllGroups)
        .get('/groups/:groupId',                    getGroupById)
        .post('/groups/',                           KoaBody(), createGroup)
        .patch('/groups/:groupId',                  KoaBody(), updateGroup)
        .delete('/groups/:groupId',                 removeGroup)
        // .get('/questionDB',                          getQuestionDb)
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
        .get('/rs/questionsGen/:topicId',           KoaBody(), getQuestionsGen)
        .delete('/rs/questionsGen/:questionsGenId', removeQuesionGen)
        // recSystem 
        .get('/rs/topics/:topicId/recSystem',       getRecSystemByTopic)
        .post('/rs/recSystems/',                    KoaBody(), createRecSystem)
        .patch('/rs/recSystems/:recSystemId',       KoaBody(), updateRecSystem)
        .delete('/rs/recSystems/:recSystemId',      removeRecSystem)
        .get('/rs/recSystems/:recSystemId/criterions', getCriterionsByRecSystem)
        .get('/rs/recSystems/:recSystemId/recValues', getRecValuesByRecSystem)
        // criterion
        .get('/rs/criterions/:criterionId',         getCriterionById)
        .post('/rs/criterions/',                    KoaBody(), createCriterion)
        .patch('/rs/criterions/:criterionId',       KoaBody(), updateCriterion)
        .delete('/rs/criterions/:criterionId',      removeCriterion)
        // criterionValue
        // .get('/rs/criterions/:criterionId/criterionValues', getCriterionValuesByCriterion)
        .post('/rs/criterionValues/',               KoaBody(), createCriterionValue)
        .patch('/rs/criterionValues/:criterionValueId', KoaBody(), updateCriterionValue)
        .delete('/rs/criterionValues/:criterionValueId', removeCriterionValue)
        // rec value
        .post('/rs/recValues/',                     KoaBody(), createRecValue)
        .patch('/rs/recValues/:recValueId',         KoaBody(), updateRecValue)
        .delete('/rs/recValues/:recValueId',        removeRecValue)
        // artists
        .get('/rs/artists',                         getAllArtist)
        .get('/rs/artists/:artistId',               getArtistById)
        .post('/rs/artists/',                       KoaBody(), createArtist)
        .patch('/rs/artists/:artistId',             KoaBody(), updateArtist)
        .delete('/rs/artists/:artistId',            removeArtist)
        .get('/rs/similarArtists',                  KoaBody(), getSimilarArtists)
        // artStyle
        .get('/rs/artstyles',                       getArtStyles)
        .post('/rs/artstyles/',                     KoaBody(), createArtStyle);
        

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};
