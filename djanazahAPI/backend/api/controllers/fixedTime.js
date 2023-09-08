const { FixedTimeServices } = require("../../services/fixedTime");

const fixedTimeController = {
  getList: async (req, res, next) => {
    let result = null;
    try {
      result = await FixedTimeServices.getList();
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ fixedTime: result });
  },
};
module.exports = fixedTimeController;
