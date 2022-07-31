const { checkToken } = require('../utils/jwt');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');

const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError());
  }
  req.user = payload;

  next();
};

module.exports = isAuthorized;
