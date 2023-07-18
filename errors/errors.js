/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-classes-per-file
class CreateAndEditUserCardProfileError extends Error {
  constructor(err) {
    super(err);
    this.message = 'При создании произошла ошибка';
    this.statusCode = err.statusCode;
  }
}

class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 404;
  }
}

class GeneralError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Ошибка на стороне сервера';
    this.statusCode = 500;
  }
}

class AuthorizationError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Авторизуйтесь';
    this.statusCode = 401;
  }
}

class WrongEmail extends Error {
  constructor(err) {
    super(err);
    this.message = 'Такой email уже зарегестрирован';
    this.statusCode = 409;
  }
}

class IncorrectData extends Error {
  constructor(err) {
    super(err);
    this.message = 'Переданы некорректные данные';
    this.statusCode = 401;
  }
}

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.code === 11000) {
    error = new CreateAndEditUserCardProfileError(err);
  } else if (err.statusCode === 404) {
    error = new NotFoundError(err);
  } else if (err.statusCode === 400) {
    error = new IncorrectData(err);
  } else if (err.name === 'JsonWebTokenError' || err.statusCode === 401) {
    error = new AuthorizationError(err);
  } else {
    error = new GeneralError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
