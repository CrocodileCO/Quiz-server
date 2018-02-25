const mongoose = require('mongoose');

const artStyleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Отсутствует название",
    unique: "Уже есть в базе"
  }
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

artStyleSchema.statics.publicFields = ['title'];
module.exports = mongoose.model('ArtStyle', artStyleSchema);
