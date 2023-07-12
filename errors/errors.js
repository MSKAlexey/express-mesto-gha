// eslint-disable-next-line max-classes-per-file
// class CreateAndEditUserCardProfileError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'При создании произошла ошибка';
//     this.statusCode = err.statusCode;
//   }
// }

// class NotFoundError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Пользователь не найден';
//     this.statusCode = err.statusCode;
//   }
// }

// class GeneralError extends Error {
//   constructor(err) {
//     super(err);
//     this.message = 'Ошибка на стороне сервера';
//     this.statusCode = 500;
//   }
// }

const errorHandler = (err, req, res, next) => {
  // let error;

  // if (err.statusCode === 400) {
  //   error = new CreateAndEditUserCardProfileError(err);
  // } else if (err.statusCode === 404) {
  //   error = new NotFoundError(err);
  // } else {
  //   error = new GeneralError(err);
  // }

  res.status(500).send({ message: 'Ошибка на сервере' });
  next();
};

module.exports = errorHandler;
