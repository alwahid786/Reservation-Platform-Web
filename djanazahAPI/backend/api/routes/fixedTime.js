const { Router } = require("express");
const controller = require("../controllers/fixedTime");
const route = Router();

exports.fixedTimeRoutes = (app) => {
  app.use("/fixedTime", route);

  route.get("/", controller.getList);
};
