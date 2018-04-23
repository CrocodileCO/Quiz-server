const mongoose = require('mongoose');

const criterionValueSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Должно быть значение"
  },
  criterionId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Criterion'
  }
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

criterionValueSchema.statics.publicFields = ['text','criterionId'];

module.exports = mongoose.model('CriterionValue', criterionValueSchema);
