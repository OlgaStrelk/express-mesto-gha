module.exports = class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message('Необходимо авторизоваться');
    this.statusCode(409);
  }
};
