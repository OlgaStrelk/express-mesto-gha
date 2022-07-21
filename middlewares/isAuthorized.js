const { checkToken } = require('../helpers/jwt');

const throwUnauthorizedError = () => {
  const error = new Error('Необходимо авторизоваться');
  error.statusCode = 401;
  throw error;
};

const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throwUnauthorizedError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    throwUnauthorizedError();
  }

  req.user = payload;

  next();
};

module.exports = { isAuthorized };
