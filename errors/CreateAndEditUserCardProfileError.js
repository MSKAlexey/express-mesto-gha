class CreateAndEditUserCardProfileError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Данные введены не верно';
    this.statusCode = 400;
  }
}

module.exports = CreateAndEditUserCardProfileError;
