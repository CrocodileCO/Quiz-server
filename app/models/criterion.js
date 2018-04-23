const mongoose = require('mongoose');

const criterionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "У критерия должнено быть название"
  },
  // type 0 - str, type 1 - num
  type: {
    type: String,
    default: 'Строка'
  },
  interval: {
    type: Number,
    default:0
  },
  recSystemId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'RecSystem'
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

criterionSchema.virtual('criterionValues', {
  ref: 'CriterionValue', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'criterionId' // is equal to `foreignField`
});

criterionSchema.statics.publicFields = ['title','type','interval','recSystemId'];

module.exports = mongoose.model('Criterion', criterionSchema);
