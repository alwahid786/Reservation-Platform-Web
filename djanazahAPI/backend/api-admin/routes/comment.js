const { Router } = require("express");
const controller = require("../controllers/comment");
const isAuth = require("../../middleware/auth");
const { comment } = require("../../middleware/validator");
const route = Router();

exports.commentRoutes = (app) => {
  app.use("/comment", route);

  route.post("/", isAuth, comment(), controller.create);
  route.get("/", isAuth, controller.getList);
  route.put("/", isAuth, comment(), controller.update);
  route.delete("/:id", isAuth, controller.delete);
  route.get("/id/:id", isAuth, controller.getByAnnouncementId);
};
