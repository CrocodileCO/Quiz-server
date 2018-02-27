const mongoose = require('../models/mongoose');
const pick = require('lodash/pick');

const Topic = require('../models/topic');
const QuestionGen = require('../models/questionGen');

// TODO refactor in apiController
// async function loadTopicById (ctx) {
//   if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
//     ctx.throw(404);
//   }

//   ctx.topicById = await Topic.findById(ctx.params.topicId);

//   if (!ctx.topicById) {
//       ctx.throw(404);
//   }
// }

async function getQuestionsGen (ctx, next) {  
  if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
      ctx.throw(404);
    }
  let questionsGen = await QuestionGen.find({'topicId': ctx.params.topicId});

  if (!questionsGen) {
      ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = questionsGen.map(q => q.toObject());

  await next();
}  

async function removeQuesionGen (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.questionsGenId)) {
    ctx.throw(404);
  }

  let questionGen = await QuestionGen.findById(ctx.params.questionsGenId);

  if (!questionGen) {
      ctx.throw(404);
  }

  await questionGen.remove();
  ctx.status = 204;

  await next();
}

module.exports = {getQuestionsGen, removeQuesionGen}