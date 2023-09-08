const { Router } = require("express");
const controller = require("../controllers/time-setting");
const isAuth = require("../../middleware/auth");
const { timeSetting } = require("../../middleware/validator");
const route = Router();

exports.timeSettingRoutes = (app) => {
  app.use("/time-setting", route);

  route.get("/all", isAuth, controller.getTimeSetting);
  route.put("/update", timeSetting(), isAuth, controller.update);
};
