const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const questionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: "у вопроса должна быть картинка"
  },
  answer1: {
    type: String,
    required: "Ответ не должен быть пустым"
  },
  answer2: {
    type: String,
    required: "Вариант 2 не должен быть пустым"
  },
  answer3: {
    type: String,
    required: "Вариант 3 не должен быть пустым"
  },
  answer4: {
    type: String,
    required: "Вариант 4 не должен быть пустым"
  },
  topicId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Topic'
  }
}, {
  //timestamps: true,
  toObject: {
    transform(doc, ret) {
      // remove the __v of every document before returning the result
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

questionSchema.statics.publicFields = ['imageUrl','answer1','answer2','answer3','answer4','topicId'];

questionSchema.plugin(random); 
 

module.exports = mongoose.model('Question', questionSchema);
