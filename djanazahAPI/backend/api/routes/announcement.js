const { Router } = require("express");
const controller = require("../controllers/announcement");
const route = Router();

exports.announcementRoutes = (app) => {
  app.use("/announcement", route);

  route.get("/all/:udid/:date", controller.getListAnnouncement);
  route.get("/allow-create/:udid", controller.checkAllowCreate);
  route.post("/create", controller.createAnnouncement);
  route.delete("/delete/:id/:udid/:date", controller.deleteAnnouncement);
  route.get("/:id", controller.getAnnouncement);
  route.put("/update", controller.updateAnnouncement);
};
