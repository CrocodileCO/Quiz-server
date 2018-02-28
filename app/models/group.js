const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  id: false,
  title: {
    type: String,
    required: "Название группы не должено быть пустым.",
    unique: "Группа с таким названием уже существует"
  }
}, 
{
  toObject: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

groupSchema.virtual('topics', {
  ref: 'Topic', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'groupId' // is equal to `foreignField`
});

groupSchema.statics.publicFields = ['title'];

module.exports = mongoose.model('Group', groupSchema);
