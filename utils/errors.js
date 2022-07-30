// валидировтаь через классы
// const throwBadRequestError = (message) => {
//   const error = new Error(message);
//   error.statusCode = 400;
//   return error;
// };

// const throwUnauthorizedError = () => {
//   const error = new Error('Необходимо авторизоваться');
//   error.statusCode = 401;
//   return error;
// };

// const throwForbiddenError = (message) => {
//   const error = new Error(message);
//   error.statusCode = 403;
//   return error;
// };

// const throwNotFoundError = (message) => {
//   const error = new Error(message);
//   error.statusCode = 404;
//   return error;
// };

// const throwConflictError = (message) => {
//   const error = new Error(message);
//   error.statusCode = 409;
//   return error;
// };

// module.exports = {
//   throwUnauthorizedError,
//   throwBadRequestError,
//   throwForbiddenError,
//   throwNotFoundError,
//   throwConflictError,
// };
