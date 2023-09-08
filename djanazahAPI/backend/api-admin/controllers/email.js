const { validationResult } = require("express-validator");
const { EmailServices } = require("../../services/email");
const bcrypt = require("bcryptjs");
const Response = require("../../ulti/response");

const emailController = {
  create: async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    let result = null;
    try {
      let isDefault = await EmailServices.checkEmpty();
      // const hashedPassword = await bcrypt.hash(password, 12);
      result = await EmailServices.create(email, password, isDefault);
    } catch (error) {
      return next(error);
    }
    delete result.password;
    return res.status(200).json({ email: result });
  },
  getList: async (req, res, next) => {
    let result = null;
    try {
      result = await EmailServices.getList();
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ email: result });
  },
  update: async (req, res, next) => {
    const { id, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    let result = null;
    if (password.trim() !== "") {
      try {
        // const hashedPassword = await bcrypt.hash(password, 12);
        result = await EmailServices.update(id, email, password);
      } catch (error) {
        return next(error);
      }
    } else {
      try {
        result = await EmailServices.updateWithoutPass(id, email);
      } catch (error) {
        return next(error);
      }
    }
    return res.status(200).json({ email: result });
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    let result = null;
    try {
      result = await EmailServices.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ email: result });
  },
  setDefault: async (req, res, next) => {
    const { id } = req.body;
    let result = null;
    try {
      result = await EmailServices.setDefault(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ email: result });
  },
};

module.exports = emailController;
