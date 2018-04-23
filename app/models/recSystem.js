const mongoose = require('mongoose');

const recSystemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "у рекомендательной системы должнено быть название"
  },
  topicId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Topic'
  }
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

recSystemSchema.virtual('criterions', {
  ref: 'Criterion', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'recSystemId' // is equal to `foreignField`
});

recSystemSchema.virtual('recValues', {
  ref: 'RecValue', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'recSystemId' // is equal to `foreignField`
});


recSystemSchema.statics.publicFields = ['title', 'topicId'];

module.exports = mongoose.model('RecSystem', recSystemSchema);
