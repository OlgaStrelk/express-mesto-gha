const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const errorWrongEmailOrPassword = () => {
  const err = new Error('Неправильные почта или пароль');
  err.statusCode = 403;
  throw err;
};

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
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Не является email',
    },
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator(password) {
        return validator.isStrongPassword(password);
      },
      message: 'Пароль недостаточно надёжный',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        errorWrongEmailOrPassword();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            errorWrongEmailOrPassword();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
