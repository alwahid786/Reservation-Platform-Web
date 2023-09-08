const { Router } = require("express");
const controller = require("../controllers/setting");
const route = Router();

exports.settingRoutes = (app) => {
  app.use("/setting", route);

  route.get("/all/:udid", controller.getSetting);
  route.put("/update", controller.updateSetting);
  route.put("/reset", controller.resetSetting);
  route.get("/share-text", controller.getShareText);
};
