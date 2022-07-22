const throwBadRequestError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
};

const throwUnauthorizedError = () => {
  const error = new Error('Необходимо авторизоваться');
  error.statusCode = 401;
  throw error;
};

const throwForbiddenError = (message) => {
  const error = new Error(message);
  error.statusCode = 403;
  throw error;
};

const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  throw error;
};

const throwConflictError = () => {
  const error = new Error('Необходимо авторизоваться');
  error.statusCode = 409;
  throw error;
};

module.exports = {
  throwUnauthorizedError,
  throwBadRequestError,
  throwForbiddenError,
  throwNotFoundError,
  throwConflictError,
};
