const { Router } = require("express");
const controller = require("../controllers/contact");
const route = Router();

exports.contactRoutes = (app) => {
  app.use("/contact", route);

  route.get("/all", controller.getContact);
};
