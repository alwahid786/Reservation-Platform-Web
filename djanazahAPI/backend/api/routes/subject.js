const { Router } = require("express");
const controller = require("../controllers/subject");
const route = Router();

exports.subjectRoutes = (app) => {
  app.use("/subjects", route);

  route.get(
    "/all/:udid",
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    controller.getSubjectList
  );

  route.post("/create", controller.createSubject);
};
