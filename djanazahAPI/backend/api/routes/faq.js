const { Router } = require("express");
const controller = require("../controllers/faq");
const route = Router();

exports.faqRoutes = (app) => {
  app.use("/faq", route);

  route.get(
    "/all",
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    controller.getFaq
  );
};
