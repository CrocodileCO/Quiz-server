const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Отсутствует имя художника",
    unique: "Этот художник уже есть в базе"
  },
  style: [{
    title: String
  }]
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

artistSchema.statics.publicFields = ['name', 'style'];
module.exports = mongoose.model('Artist', artistSchema);
