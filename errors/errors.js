const errorHandler = (err, req, res, next) => {
  res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
  next();
};

module.exports = errorHandler;
