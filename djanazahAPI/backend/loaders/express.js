const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const express = require("express");
const path = require("path");

const { apiRoutes } = require("../api/index");
const { adminRoutes } = require("../api-admin/index");
const { config } = require("../config/index");

exports.expressLoader = (app) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
      const error = new Error();
      cb(
        null,
        new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname
      );
    },
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  };

  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
  app.use(bodyParser.json({ limit: "50mb" }));

  app.use(
    "/backend/uploads",
    express.static(path.join(__dirname.replace("/loaders", ""), "uploads"))
  );

  app.use(
    multer({
      storage: fileStorage,
      fileFilter: fileFilter,
    }).single("image")
  );

  // Load API routes
  app.use(config.api.prefix, apiRoutes());
  app.use(config.api.prefix + "/admin", adminRoutes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
    });
  });
};
