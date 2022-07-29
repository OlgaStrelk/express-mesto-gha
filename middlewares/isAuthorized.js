const { checkToken } = require('../utils/jwt');
const { throwUnauthorizedError } = require('../utils/errors');

const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(throwUnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(throwUnauthorizedError());
  }
  req.user = payload;

  next();
};

module.exports = isAuthorized;
