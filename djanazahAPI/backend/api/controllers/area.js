const { AreaServices } = require("../../services/area");

const areaController = {
  getListArea: async (req, res, next) => {
    try {
      const result = await AreaServices.GetListArea();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = areaController;
