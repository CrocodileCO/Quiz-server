const mongoose = require('mongoose');

const questionGenSchema = new mongoose.Schema({
  answerRight: {
    type: String,
    required: "у вопроса должнен быть ответ"
  },
  imageUrl: {
    type: String,
    required: "У вопроса должна быть картинка"
  },
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
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

questionGenSchema.statics.publicFields = ['answerRight','imageUrl','information','topicId'];

module.exports = mongoose.model('QuestionGen', questionGenSchema);
