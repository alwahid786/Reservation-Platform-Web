const { Router } = require("express");
const controller = require("../controllers/area");
const route = Router();

exports.areaRoutes = (app) => {
  app.use("/area", route);

  route.get("/all", controller.getListArea);
};
