const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Название категории не должено быть пустым.",
    unique: "Такое название уже существует"
  },
  imageUrl: {
    type: String,
    required: "у категории должна быть картинка"
  }
}, {
  timestamps: true,
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

topicSchema.statics.publicFields = ['title', 'imageUrl'];

module.exports = mongoose.model('Topic', topicSchema);
