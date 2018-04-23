const mongoose = require('../models/mongoose');
const pick = require('lodash/pick');

const Topic = require('../models/topic');
const QuestionGen = require('../models/questionGen');
const RecSystem = require('../models/recSystem');
const RecValue = require('../models/recValue');
const Criterion = require('../models/criterion')
const CriterionValue = require('../models/criterionValue')

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

async function loadRecSystemById(ctx) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.recSystemId)) {
    ctx.throw(404);
  }
  ctx.recSystemById = await RecSystem.findById(ctx.params.recSystemId);

  if (!ctx.recSystemById) {
    ctx.throw(404);
  }
}

async function getRecSystemByTopic (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
    ctx.throw(404);
  }
  let recSystem = await RecSystem.findOne({'topicId': ctx.params.topicId});

  if (!recSystem) {
      ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = recSystem.toObject();

  await next();
}

async function createRecSystem (ctx, next) {
  let recSystem = await RecSystem.create(pick(ctx.request.body, RecSystem.publicFields));
  ctx.body = recSystem.toObject();
  ctx.status = 201;
  await next();
}

async function updateRecSystem (ctx, next) {
  await loadRecSystemById(ctx);
  Object.assign(ctx.recSystemById, pick(ctx.request.body, RecSystem.publicFields));
  await ctx.recSystemById.save();
  ctx.body = ctx.recSystemById.toObject();
  await next();
}

async function removeRecSystem (ctx, next) {
  await loadRecSystemById(ctx);
  await ctx.recSystemById.remove();
  ctx.status = 204;
  await next();
}

async function getCriterionsByRecSystem (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.recSystemId)) {
    ctx.throw(404);
  }

  let recSystem = await RecSystem.findById(ctx.params.recSystemId).populate([{path: 'criterions', populate: {path: 'criterionValues'}}]);

  if (!recSystem) {
      ctx.throw(404);
  }

  ctx.body = recSystem.toJSON().criterions;

  await next();
}

async function getRecValuesByRecSystem (ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.recSystemId)) {
    ctx.throw(404);
  }

  let recSystem = await RecSystem.findById(ctx.params.recSystemId).populate([{path: 'recValues', populate: {path: 'criterionValues'}}]);
  // console.log(recSystem);
  if (!recSystem) {
      ctx.throw(404);
  }

  ctx.body = recSystem.toJSON().recValues;

  await next();
}

async function loadCriterionById(ctx) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.criterionId)) {
    ctx.throw(404);
  }
  ctx.criterionById = await Criterion.findById(ctx.params.criterionId);

  if (!ctx.criterionById) {
    ctx.throw(404);
  }
}

async function getCriterionById (ctx, next) {
  // await loadCriterionById(ctx);
  // ctx.body = ctx.criterionById;
  // ctx.status = 200;
  // await next();
  if (!mongoose.Types.ObjectId.isValid(ctx.params.criterionId)) {
    ctx.throw(404);
  }

  let criterion = await Criterion.findById(ctx.params.criterionId).populate('criterionValues');

  if (!criterion) {
      ctx.throw(404);
  }

  ctx.body = criterion.toJSON();

  await next();
}

async function createCriterion (ctx, next) {
  let criterion = await Criterion.create(pick(ctx.request.body, Criterion.publicFields));
  ctx.body = criterion.toObject();
  ctx.status = 201;
  await next();
}

async function updateCriterion (ctx, next) {
  await loadCriterionById(ctx);
  Object.assign(ctx.criterionById, pick(ctx.request.body, Criterion.publicFields));
  await ctx.criterionById.save();
  ctx.body = ctx.criterionById.toObject();
  await next();
}

async function removeCriterion (ctx, next) {
  await loadCriterionById(ctx);
  let delCV = await CriterionValue.find({criterionId: ctx.params.criterionId});
  await removeCV (ctx.criterionById, delCV)
  // await ctx.criterionById.remove();

  // удалить все criterionValue и убрать у всех рекВальях этот критерий
  ctx.status = 204;
  await next();
}

async function removeCV (criterion, delCV) {
  await console.log(delCV);
  // let recSystem = await RecSystem.findById(criterion.recSystemId).populate([{path: 'recValues', populate: {path: 'criterionValues'}}]);
  // // console.log(recSystem);
  // if (!recSystem) {
  //     ctx.throw(404);
  // }

  // console.log(recSystem.toJSON().recValues[0].criterionValues);

  let delRV = await RecValue.find({recSystemId: criterion.recSystemId}).elemMatch('criterionValues', {criterionId: criterion.id});
  // .populate('criterionValues');
  // console.log(delRV[0].criterionValues)
  for (let i = 0; i < delRV.length; i++){
    let tmp = delRV[i].criterionValues;
    console.log(tmp);
    for (let j = 0; j < tmp.length; j++) {
      let h = tmp[j];
      if (h.criterionId == criterion.id){
        tmp[j].value = '';
        delRV[i].criterionValues = tmp;
        console.log(delRV[i]);
        await delRV[i].save();
        break;
      }
    }
  }
}

async function loadCriterionValueById(ctx) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.criterionValueId)) {
    ctx.throw(404);
  }
  ctx.criterionValueById = await CriterionValue.findById(ctx.params.criterionValueId);

  if (!ctx.criterionValueById) {
    ctx.throw(404);
  }
}

async function createCriterionValue (ctx, next) {
  let criterionValue = await CriterionValue.create(pick(ctx.request.body, CriterionValue.publicFields));
  ctx.body = criterionValue.toObject();
  ctx.status = 201;
  await next();
}

async function updateCriterionValue (ctx, next) {
  await loadCriterionValueById(ctx);
  Object.assign(ctx.criterionValueById, pick(ctx.request.body, CriterionValue.publicFields));
  await ctx.criterionValueById.save();
  ctx.body = ctx.criterionValueById.toObject();
  await next();
}

async function removeCriterionValue (ctx, next) {
  await loadCriterionValueById(ctx);
  await ctx.criterionValueById.remove();
  ctx.status = 204;
  await next();
}


async function loadRecValueById(ctx) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.recValueId)) {
    ctx.throw(404);
  }
  ctx.recValueById = await RecValue.findById(ctx.params.recValueId);

  if (!ctx.recValueById) {
    ctx.throw(404);
  }
}

async function createRecValue (ctx, next) {
  let recValue = await RecValue.create(pick(ctx.request.body, RecValue.publicFields));
  ctx.body = recValue.toObject();
  ctx.status = 201;
  await next();
}

async function updateRecValue (ctx, next) {
  await loadRecValueById(ctx);
  Object.assign(ctx.recValueById, pick(ctx.request.body, RecValue.publicFields));
  await ctx.recValueById.save();
  ctx.body = ctx.recValueById.toObject();
  await next();
}

async function removeRecValue (ctx, next) {
  await loadRecValueById(ctx);
  await ctx.recValueById.remove();
  ctx.status = 204;
  await next();
}

// async function getCriterionValuesByCriterion (ctx, next) {
//   if (!mongoose.Types.ObjectId.isValid(ctx.params.criterionId)) {
//     ctx.throw(404);
//   }

//   let criterion = await Criterion.findById(ctx.params.criterionId).populate('criterionValues');

//   if (!criterion) {
//       ctx.throw(404);
//   }

//   ctx.body = criterion.toJSON().criterionValues;

//   await next();
// }

module.exports = {getQuestionsGen, removeQuesionGen, getRecSystemByTopic, createRecSystem, updateRecSystem, removeRecSystem, getCriterionsByRecSystem, getRecValuesByRecSystem,
  getCriterionById, createCriterion, updateCriterion, removeCriterion,
  createCriterionValue, updateCriterionValue, removeCriterionValue,
  createRecValue, updateRecValue, removeRecValue }