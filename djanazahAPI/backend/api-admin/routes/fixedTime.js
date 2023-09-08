const { Router } = require("express");
const controller = require("../controllers/fixedTime");
const isAuth = require("../../middleware/auth");
const { fixedTime } = require("../../middleware/validator");
const route = Router();

exports.fixedTimeRoutes = (app) => {
  app.use("/fixedTime", route);

  route.post("/", isAuth, fixedTime(), controller.create);
  route.get("/", isAuth, controller.getList);
  route.put("/", isAuth, fixedTime(), controller.update);
  route.delete("/:id", isAuth, controller.delete);
};
