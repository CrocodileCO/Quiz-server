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

async function removeQuesionsGen (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.quesionsGenId)) {
    ctx.throw(404);
  }

  let quesionsGen = await quesionsGen.findById(ctx.params.quesionsGenId);

  if (!quesionsGen) {
      ctx.throw(404);
  }

  await quesionsGen.remove();
  ctx.status = 204;

  await next();
}

module.exports = {getQuestionsGen, removeQuesionsGen}