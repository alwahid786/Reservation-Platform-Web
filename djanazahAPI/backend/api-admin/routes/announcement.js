const { Router } = require("express");
const controller = require("../controllers/announcement");
const isAuth = require("../../middleware/auth");
const isAuthAsAny = require("../../middleware/authAsAny");

// const { announcement } = require("../../middleware/validator");
const route = Router();

exports.announcementRoutes = (app) => {
  app.use("/announcement", route);

  route.get("/all", isAuthAsAny, controller.getListAnnouncement);
  route.get("/single/:id", controller.getAnnouncement);
  route.get("/push/:announcementId", isAuthAsAny, controller.pushNotification);
  route.post("/create", isAuthAsAny, controller.create);
  route.put("/update", isAuthAsAny, controller.update);
  route.delete("/delete/:id", isAuthAsAny, controller.delete);
};
