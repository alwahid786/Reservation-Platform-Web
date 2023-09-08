const { Router } = require("express");
const controller = require("../controllers/setting");
const isAuth = require("../../middleware/auth");
const { setting, shareText } = require("../../middleware/validator");
const route = Router();

exports.settingRoutes = (app) => {
  app.use("/setting", route);

  route.get("/all", isAuth, controller.getSetting);
  route.get("/share-text", isAuth, controller.getShareText);
  route.put("/update", setting(), isAuth, controller.update);
  route.put(
    "/update-share-text",
    shareText(),
    isAuth,
    controller.updateShareText
  );
};
