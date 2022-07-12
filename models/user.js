const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Симон де Бовуар',
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'мыслительница',
  },

  avatar: {
    type: String,
    default: 'https://www.novochag.ru/upload/img_cache/e08/e08c959ebbe5335ba627a87fb73ce72a_ce_1042x720x56x0_cropped_666x444.jpg',
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
