const { validationResult } = require("express-validator");
const { AreaServices } = require("../../services/area");

const areaController = {
  getArea: async (req, res, next) => {
    try {
      const result = await AreaServices.GetListLocation();

      if (result.status) {
        return res.status(result.code).json({ area: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }
      const { country, provinces } = req.body;
      const result = await AreaServices.CreateArea(country, provinces);

      if (result.status) {
        return res.status(result.code).json({ area: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }
      const { country, provinces } = req.body;
      const result = await AreaServices.UpdateArea(country, provinces);

      if (result.status) {
        return res.status(result.code).json({ area: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await AreaServices.DeleteArea(id);

      if (result.status) {
        return res.status(result.code).json({ area: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = areaController;
