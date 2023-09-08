const { config } = require("../config");
const jwt = require("jsonwebtoken");
const { AuthServices } = require("../services/auth");

const isAuthAsAny = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.status = 401;
    return next(error);
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.tokenSecret);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.status = 401;
    return next(error);
  }
  req.userId = decodedToken.userId;

  const result = await AuthServices.CheckSupport(decodedToken.userId);

  if (result.status) {
    req.isSupport = result.body;
  }

  return next();
};
module.exports = isAuthAsAny;
