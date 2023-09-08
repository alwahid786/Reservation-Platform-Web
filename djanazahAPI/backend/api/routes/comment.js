const { Router } = require("express");
const controller = require("../controllers/comment");
const { comment } = require("../../middleware/validator");
const route = Router();

exports.commentRoutes = (app) => {
  app.use("/comment", route);

  route.post("/", comment(), controller.create);
  route.delete("/", controller.delete);
  route.get("/id/:id", controller.getByAnnouncementId);
};
