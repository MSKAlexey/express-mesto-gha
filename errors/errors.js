/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-classes-per-file
// class CreateAndEditUserCardProfileError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'При создании произошла ошибка';
//     this.statusCode = err.statusCode;
//   }
// }

// class UserNotFoundError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Пользователь не найден';
//     this.statusCode = 404;
//   }
// }

// class GeneralError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Ошибка на стороне сервера';
//     this.statusCode = 500;
//   }
// }

// class UserAlreadyExists extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Ошибка на стороне сервера';
//     this.statusCode = 500;
//   }
// }

// class JWTokenError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'У Вас не валидный JWT';
//     this.statusCode = 403;
//   }
// }

// class WrongEmail extends Error {
//   constructor(err) {
//     super(err);
//     this.message = err.message;
//     this.statusCode = 403;
//   }
// }

const errorHandler = (err, req, res, next) => {
  // let error;
  // if (err.code === 11000) {
  //   error = new CreateAndEditUserCardProfileError(err);
  // } else if (err.statusCode === 404) {
  //   error = new UserNotFoundError(err);
  // } else if (err.statusCode === 403) {
  //   error = new UserNotFoundError(err);
  // } else if (err.statusCode === 212) {
  //   error = new WrongEmail(err);
  // } else if (err.name === 'JsonWebTokenError') {
  //   error = new JWTokenError(err);
  // } else {
  //   error = new GeneralError(err);
  // }

  res.status(500).send({ message: 'Ошибка на строне сервера' });
  next();
};

module.exports = errorHandler;
