/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-classes-per-file
class CreateAndEditUserCardProfileError extends Error {
  constructor(err) {
    super(err);
    this.message = 'При создании произошла ошибка';
    this.statusCode = err.statusCode;
  }
}

class UserNotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь не найден';
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

class UserEmailExist extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с таким email не найден';
    this.statusCode = 401;
  }
}

class Authorization extends Error {
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

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.code === 11000) {
    error = new CreateAndEditUserCardProfileError(err);
  } else if (err.statusCode === 404) {
    error = new UserNotFoundError(err);
  } else if (err.statusCode === 403) {
    error = new UserNotFoundError(err);
  } else if (err.statusCode === 403) {
    error = new UserNotFoundError(err);
  } else if (err.statusCode === 401) {
    error = new UserEmailExist(err);
  } else if (err.name === 'JsonWebTokenError') {
    error = new Authorization(err);
  } else {
    error = new GeneralError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
