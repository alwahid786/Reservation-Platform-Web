const { Router } = require("express");
const controller = require("../controllers/area");
const isAuth = require("../../middleware/auth");
const { area } = require("../../middleware/validator");
const isAuthAsAny = require("../../middleware/authAsAny");
const route = Router();

exports.areaRoutes = (app) => {
  app.use("/area", route);

  route.get("/all", isAuthAsAny, controller.getArea);
  route.post("/create", area(), isAuth, controller.create);
  route.put("/update", area(), isAuth, controller.update);
  route.delete("/delete/:id", isAuth, controller.delete);
};
