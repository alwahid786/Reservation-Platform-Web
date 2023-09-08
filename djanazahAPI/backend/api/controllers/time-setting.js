const { TimeSettingServices } = require("../../services/time-setting");

const timeSettingController = {
  getTimeSetting: async (req, res, next) => {
    try {
      const timeSetting = await TimeSettingServices.GetTimeSettingApp();
      res.status(200).json(timeSetting);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = timeSettingController;
