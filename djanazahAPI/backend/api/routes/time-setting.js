const { Router } = require("express");
const controller = require("../controllers/time-setting");
const route = Router();

exports.timeSettingRoutes = (app) => {
  app.use("/time-setting", route);

  route.get("/all", controller.getTimeSetting);
};
