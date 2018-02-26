const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Отсутствует имя художника",
    unique: "Этот художник уже есть в базе"
  },
  styles: [{
    type: String
  }]
}, {
  toObject: {
    transform(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

artistSchema.statics.publicFields = ['name', 'styles'];

artistSchema.plugin(random); 

module.exports = mongoose.model('Artist', artistSchema);
