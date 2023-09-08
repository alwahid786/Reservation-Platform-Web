const { Router } = require("express");
const controller = require("../controllers/faq");
const isAuth = require("../../middleware/auth");
const { faq } = require("../../middleware/validator");
const route = Router();

exports.faqRoutes = (app) => {
  app.use("/faq", route);

  route.get("/all", isAuth, controller.getFaqList);
  route.post("/create", faq(), isAuth, controller.create);
  route.put("/update", faq(), isAuth, controller.update);
  route.delete("/delete/:id", isAuth, controller.delete);
};
