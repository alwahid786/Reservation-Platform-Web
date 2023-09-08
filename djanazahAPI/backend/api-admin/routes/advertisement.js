const { Router } = require("express");
const controller = require("../controllers/advertisement");
const isAuth = require("../../middleware/auth");
const { advertisement } = require("../../middleware/validator");
const route = Router();

exports.advertisementRoutes = (app) => {
  app.use("/advertisement", route);

  route.get("/all", isAuth, controller.getAdvertisement);
  route.put("/update-image", isAuth, controller.updateImage);
  route.put("/update", isAuth, controller.update);
};
