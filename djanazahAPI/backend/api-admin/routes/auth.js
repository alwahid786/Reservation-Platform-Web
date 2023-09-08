const { Router } = require("express");
const controller = require("../controllers/auth");
const isAuth = require("../../middleware/auth");
const {
  login,
  register,
  userInfo,
  password,
  supportInfo,
  supportPassword,
} = require("../../middleware/validator");
const isAuthAsAny = require("../../middleware/authAsAny");
const route = Router();

exports.authRoutes = (app) => {
  app.use("/auth", route);

  route.get("/check-user", isAuthAsAny, controller.checkSupport);
  route.get("/info", isAuthAsAny, controller.getUserInfo);
  route.post("/login", login(), controller.login);
  route.post("/register", register(), isAuth, controller.register);
  route.put("/update-info", userInfo(), isAuthAsAny, controller.updateInfo);
  route.put("/update-password", password(), isAuth, controller.updatePassword);
  route.put(
    "/update-support",
    supportInfo(),
    isAuthAsAny,
    controller.updateSupport
  );
  route.put(
    "/update-support-password",
    supportPassword(),
    isAuth,
    controller.updateSupportPassword
  );
  route.delete("/delete-support/:userId", isAuth, controller.deleteSupport);
};
