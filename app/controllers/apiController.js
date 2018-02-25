const myDb = require('../models/testDbManager');
const mongoose = require('../models/mongoose');
const pick = require('lodash/pick');

const User = require('../models/user');
const Topic = require('../models/topic');
const Question = require('../models/question');
const Artist = require('../models/artist');

// TODO delete
// const fs = require('fs');
// const osmosis = require('osmosis');
// 
// ============== TOPICS ====================
/**
 * @example curl -XGET "http://localhost:3000/api/topics"
 */
async function getAllTopic(ctx, next) {
    let topics = await Topic.find({});
    ctx.status = 200;
    ctx.body = topics.map(topic => topic.toObject());
    await next(); 
}

/**
 * @example curl -XGET "http://localhost:3000/api/topics/:topicId"
 */
async function getTopicById(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }

    //.populate('questions')
    let topic = await Topic.findById(ctx.params.topicId);
    
    if (!topic) {
        ctx.throw(404);
    }

    ctx.body = topic.toObject();

    await next();
}

/**
 * @example curl -XPOST "http://localhost:3000/api/topics" -d '{"title":"new Topic", "imageUrl":"http://memesmix.net/media/created/vdimts.jpg"}' -H 'Content-Type: application/json'
 */
async function createTopic(ctx, next) {
    let topic = await Topic.create(pick(ctx.request.body, Topic.publicFields));
    //console.log(ctx.request.body);
    ctx.body = topic.toObject();
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPATCH "http://localhost:3000/api/topics/:topicId" -d '{"title":"topicUp"}' -H 'Content-Type: application/json'
 */
async function updateTopic(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }
    
    let topic = await Topic.findById(ctx.params.topicId);
    
    if (!topic) {
        ctx.throw(404);
    }

    Object.assign(topic, pick(ctx.request.body, Topic.publicFields));
    await topic.save();

    ctx.body = topic.toObject();
}

/**
 * @example curl -XDELETE "http://localhost:3000/api/topics/:topicId"
 */
async function removeTopic(ctx,next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }
    
    let topic = await Topic.findById(ctx.params.topicId);
    
    if (!topic) {
        ctx.throw(404);
    }

    await topic.remove();
    ctx.status = 204;

    await next();
}

// ============== QUESTION ====================
/**
 * @example curl -XGET "http://localhost:3000/questions"
 */
async function getAllQuestion(ctx, next) {
    let questions = await Question.find({});
    ctx.status = 200;
    ctx.body = questions.map(question => question.toObject());
    await next(); 
}

/**
 * @example curl -XGET "http://localhost:3000/questions/:questionId"
 */
async function getQuestionById(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.questionId)) {
        ctx.throw(404);
    }
    
    //.populate('questions')
    let question = await Question.findById(ctx.params.questionId);
    
    if (!question) {
        ctx.throw(404);
    }

    ctx.body = question.toObject();

    await next();
}

/**
 * @example curl -XPOST "http://localhost:3000/api/questions" -d '{"imageUrl":"http://memesmix.net/media/created/vdimts.jpg","answer1":"vasya","answer2":"petya","answer3":"sereja","answer4":"valera","topicId":"5a7d3a1890843bbf62b1cc2a"}' -H 'Content-Type: application/json'
 */
async function createQuestion(ctx, next) {
    let question = await Question.create(pick(ctx.request.body, Question.publicFields));
    //console.log(ctx.request.body);
    ctx.body = question.toObject();
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPATCH "http://localhost:3000/api/questions/:questionId" -d '{"answer1":"answerUp"}' -H 'Content-Type: application/json'
 */
async function updateQuestion(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.questionId)) {
        ctx.throw(404);
    }
    
    let question = await Question.findById(ctx.params.questionId);
    
    if (!question) {
        ctx.throw(404);
    }

    Object.assign(question, pick(ctx.request.body, Question.publicFields));
    await question.save();

    ctx.body = question.toObject();
}

/**
 * @example curl -XDELETE "http://localhost:3000/api/questions/:questionId"
 */
async function removeQuestion(ctx,next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.questionId)) {
        ctx.throw(404);
    }
    
    let question = await Question.findById(ctx.params.questionId);
    
    if (!question) {
        ctx.throw(404);
    }

    await question.remove();
    ctx.status = 204;

    await next();
}
/**
 * @example curl -XGET "http://localhost:3000/api/topics/:topicId/questions"
 */
async function getAllQuestionsByTopic(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }

    let topic = await Topic.findById(ctx.params.topicId).populate('questions');
    
    if (!topic) {
        ctx.throw(404);
    }

    ctx.body = topic.toJSON().questions;

    await next();
}

function p_getRandomQuestionsByTopic(schema,conditions, fields, options) {
    return new Promise((resolve, reject) => {
        schema.findRandom(conditions, fields, options, function(err, results) {
        if (err) reject(err);
        else resolve(results);
      })
    })
  }
/**
 * @example curl -XGET "http://localhost:3000/api/topics/:topicId/rnd"
 */
async function getRandomQuestionsByTopic(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }
    let limit = 10; //defayl limit = 10
    if (Number(ctx.request.query.limit)>0)
        limit = Number(ctx.request.query.limit); 

    let questions = await  p_getRandomQuestionsByTopic(Question, {topicId: { $in: [ctx.params.topicId] }},{},{limit:limit});

    if (!questions) {
        ctx.throw(404);
    }

    ctx.body = questions;
    await next();
}
/**
 * @example curl -XGET "http://localhost:3000/api/questions/:questionId/inc_quantity?num=1"
 * @param num - answer num
 */
async function incrementQuantityAnswer(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.questionId)) {
        ctx.throw(404);
    }
    let num = Number(ctx.request.query.num);
    let question =  await Question.findById(ctx.params.questionId).populate('answers');
    if (num > 0 && num <= 4){
        question.answers[num-1].pickAmount++;
        await question.save();
        ctx.status= 200;
    }
    else 
        ctx.throw(404);

    await next();
}

// ============== ARTISTS ====================
/**
 * @example curl -XGET "http://localhost:3000/api/rs/artists"
 */
async function getAllArtist(ctx, next) {
    let artist = await Artist.find({});
    ctx.status = 200;
    ctx.body = artist.map(artist => artist.toObject());
    await next(); 
}

/**
 * @example curl -XGET "http://localhost:3000/api/rs/artists/:artistId"
 */
async function getArtistById(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.artistId)) {
        ctx.throw(404);
    }

    //.populate('questions')
    let artist = await Artist.findById(ctx.params.artistId);
    
    if (!artist) {
        ctx.throw(404);
    }

    ctx.body = artist.toObject();

    await next();
}

/**
 * @example curl -XPOST "http://localhost:3000/api/rs/artists" -d '{"title":"new artist"}' -H 'Content-Type: application/json'
 */
async function createArtist(ctx, next) {
    let artist = await Artist.create(pick(ctx.request.body, Artist.publicFields));
    //console.log(ctx.request.body);
    ctx.body = artist.toObject();
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPATCH "http://localhost:3000/api/rs/artists/:artistId" -d '{"title":"artistUp"}' -H 'Content-Type: application/json'
 */
async function updateArtist(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.artistId)) {
        ctx.throw(404);
    }
    
    let artist = await Artist.findById(ctx.params.artistId);
    
    if (!artist) {
        ctx.throw(404);
    }

    Object.assign(artist, pick(ctx.request.body, Artist.publicFields));
    await artist.save();

    ctx.body = artist.toObject();
}

/**
 * @example curl -XDELETE "http://localhost:3000/api/rs/artists/:artistId"
 */
async function removeArtist(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.artistId)) {
        ctx.throw(404);
    }
    
    let artist = await Artist.findById(ctx.params.artistId);
    
    if (!artist) {
        ctx.throw(404);
    }

    await artist.remove();
    ctx.status = 204;

    await next();
}


// TODO: delete
// async function parseArtist(ctx, next){
//     var array = fs.readFileSync('1.txt').toString().split("\n");
//     for(i in array) {
//         let artistName = array[i].substring(0,array[i].length-1)
//         let artist = await Artist.create(pick({'name': artistName}, Artist.publicFields));
//         artist.save();
//     }
//     next();
// }

// async function parseArtistStyle(ctx, next) {
//     let artists = await Artist.find({});
//     //for (i in artists){
//         let artist = artists[90];
//         let styles = [];
//         let uri = 'ru.wikipedia.org/wiki/'+artist.name.split(' ').join('_');
//         console.log(uri);
//         osmosis
//                 .get(uri)
//                 .set({'Title': 'title'})
//                 .data(console.log)
        
//     //}
// }

module.exports = {getAllTopic, getTopicById, createTopic, removeTopic, updateTopic, getAllQuestion, getQuestionById, createQuestion, removeQuestion, updateQuestion, getAllQuestionsByTopic, getRandomQuestionsByTopic, incrementQuantityAnswer, getAllArtist, getArtistById, createArtist, removeArtist, updateArtist};
