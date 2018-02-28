const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Название топика не должено быть пустым.",
    unique: "Такое название уже существует"
  },
  imageUrl: {
    type: String,
    required: "у топика должна быть картинка"
  },
  groupId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Group',
    required: "У топика должна быть группа"
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    // virtuals: true,
    transform(doc, ret) {
      // remove the __v of every document before returning the result
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    }
  }
});

topicSchema.virtual('questions', {
  ref: 'Question', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'topicId' // is equal to `foreignField`
});

topicSchema.statics.publicFields = ['title', 'imageUrl','groupId'];

module.exports = mongoose.model('Topic', topicSchema);
