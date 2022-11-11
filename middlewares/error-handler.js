const { StatusCodes } = require("http-status-codes");
const { response } = require("../utils/index.js");

const errorHandlerMiddleware = (req, err, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Algo ha salido mal, por favor intentelo luego',
  };
  
  return response(customError.statusCode,  customError.msg, {message: customError.msg}, res)
};

module.exports = errorHandlerMiddleware;  