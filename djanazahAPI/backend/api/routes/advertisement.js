const { Router } = require("express");
const controller = require("../controllers/advertisement");
const route = Router();

exports.advertisementRoutes = (app) => {
  app.use("/advertisement", route);

  route.get("/active", controller.getAdvertisements);
  route.get("/admob", controller.getAdmob);
};
