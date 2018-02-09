const myDb = require('../models/testDbManager');
const mongoose = require('../models/mongoose');
const pick = require('lodash/pick');


const User = require('../models/user');
const Topic = require('../models/topic');

// ============== TOPICS ====================
/**
 * @example curl -XGET "http://localhost:8080/topics"
 */
async function getAllTopic(ctx, next) {
    let topics = await Topic.find({});

    ctx.body = topics.map(topic => topic.toObject());
    await next(); 
}

/**
 * @example curl -XGET "http://localhost:8080/topics/:topicId"
 */
async function getTopicById(ctx, next) {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.topicId)) {
        ctx.throw(404);
    }
    
    let topic = await Topic.findById(ctx.params.topicId);
    
    if (!topic) {
        ctx.throw(404);
    }

    ctx.body = topic.toObject();

    await next();
}

/**
 * @example curl -XPOST "http://localhost:8080/api/topics" -d '{"title":"new Topic", "imageUrl":"http://memesmix.net/media/created/vdimts.jpg"}' -H 'Content-Type: application/json'
 */
async function createTopic(ctx, next) {
    let topic = await Topic.create(pick(ctx.request.body, Topic.publicFields));
    console.log(ctx.request.body);
    ctx.body = topic.toObject();
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPATCH "http://localhost:8080/api/topics/:topicId" -d '{"title":"topicUp"}' -H 'Content-Type: application/json'
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
 * @example curl -XDELETE "http://localhost:8080/api/topics/:topicId"
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


module.exports = {getAllTopic, getTopicById, createTopic, removeTopic, updateTopic};
