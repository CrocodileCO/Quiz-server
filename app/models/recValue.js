const mongoose = require('mongoose');

const recValueSchema = new mongoose.Schema({
  answerRight: {
    type: String,
    required: "Не задан правильный ответ"
  },
  criterionValues: [{
    criterionId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref: 'CriterionValue',
      required: 'Не указан ид критерия'
    },
    value: String
  }],
  recSystemId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'RecSystem',
    required: 'Не указана рек система'
  }
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

recValueSchema.statics.publicFields = ['answerRight','criterionValues','recSystemId'];

module.exports = mongoose.model('RecValue', recValueSchema);
