const { checkToken } = require('../utils/jwt');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const UNAUTHORIZED_USER_ERR_MESSAGE = 'Необходимо авторизоваться';

const isAuthorized = (req, res, next) => {
  console.log('есть здесь 1');
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_USER_ERR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  console.log(payload);
  try {
    payload = checkToken(token);
  } catch (err) {
    console.log(err);
    next(new UnauthorizedError(UNAUTHORIZED_USER_ERR_MESSAGE));
    return;
  }
  req.user = payload;
  console.log(req.user);
  next();
};

module.exports = isAuthorized;
