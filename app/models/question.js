const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const questionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: "у вопроса должна быть картинка"
  },
  answers: [{
    id: Number,
    text: String,
    pickAmount: {
      type: Number,
      default: 0
    }
  }],
  information: {
    text: {
      type: String,
      default: ""
    }
  },
  topicId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Topic'
  }
}, {
  //timestamps: true,
  toObject: {
    transform(doc, ret) {
      for (let i = 0; i<4; i++){
        delete ret.answers[i]._id;
      }
      // remove the __v of every document before returning the result
      // delete ret.createdAt;
      // delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

questionSchema.statics.publicFields = ['imageUrl','answers','topicId','information'];

questionSchema.plugin(random); 
 

module.exports = mongoose.model('Question', questionSchema);
