const { validationResult } = require("express-validator");
const { TimeSettingServices } = require("../../services/time-setting");

const settingController = {
  getTimeSetting: async (req, res, next) => {
    try {
      const result = await TimeSettingServices.GetTimeSetting();

      if (result.status) {
        return res.status(result.code).json({ timeSetting: result.body });
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
      const { adsDelay, fullAdDelay, allowCreateDelay } = req.body;
      const result = await TimeSettingServices.UpdateTimeSetting(
        adsDelay,
        fullAdDelay,
        allowCreateDelay
      );

      if (result.status) {
        return res.status(result.code).json({ timeSetting: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = settingController;
