class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res, next) => {
  try {
    let { statusCode, message, name } = err;
    res.statusMessage = message;
    res.status(statusCode);
    res.end();
  } catch (error) {
    res.statusMessage = "Internal Server Error";
    res.status(500);
    res.end();
  }
};

module.exports = {
  ErrorHandler,
  handleError,
};
