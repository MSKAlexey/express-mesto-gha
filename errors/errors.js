// eslint-disable-next-line max-classes-per-file
class CreateAndEditUserCardProfileError extends Error {
  constructor(message) {
    super(message);
    this.message = message.body;
    this.statusCode = message.statusCode;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message.body;
    this.statusCode = message.statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  let error;

  if (err.statusCode = 400) {
    error = new CreateAndEditUserCardProfileError(err);
  } else {
    error = new NotFoundError(err);
  }

  res.status(err.statusCode).send({ message: error.message });
  next();
};

module.exports = {
  CreateAndEditUserCardProfileError,
  errorHandler,
  NotFoundError,
};
