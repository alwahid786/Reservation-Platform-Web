const { validationResult } = require("express-validator");
const { FixedTimeServices } = require("../../services/fixedTime");
const Response = require("../../ulti/response");

const fixedTimeController = {
  create: async (req, res, next) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    let result = null;
    try {
      result = await FixedTimeServices.create(name);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ fixedTime: result });
  },
  getList: async (req, res, next) => {
    let result = null;
    try {
      result = await FixedTimeServices.getList();
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ fixedTime: result });
  },
  update: async (req, res, next) => {
    const { id, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    let result = null;
    try {
      result = await FixedTimeServices.update(id, name);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ fixedTime: result });
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    let result = null;
    try {
      result = await FixedTimeServices.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ fixedTime: result });
  },
};

module.exports = fixedTimeController;
