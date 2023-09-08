const { Router } = require("express");
const controller = require("../controllers/email");
const isAuth = require("../../middleware/auth");
const { createEmail, updateEmail } = require("../../middleware/validator");
const route = Router();

exports.emailRoutes = (app) => {
  app.use("/email", route);

  route.post("/", isAuth, createEmail(), controller.create);
  route.get("/", isAuth, controller.getList);
  route.put("/", isAuth, updateEmail(), controller.update);
  route.delete("/:id", isAuth, controller.delete);
  route.post("/default", isAuth, controller.setDefault);
};
