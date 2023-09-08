const { validationResult } = require("express-validator");
const { SettingServices } = require("../../services/setting");

const settingController = {
  getSetting: async (req, res, next) => {
    try {
      const result = await SettingServices.GetSettingList();

      if (result.status) {
        return res.status(result.code).json({ setting: result.body });
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
      const { subject, fontSize, version } = req.body;
      const result = await SettingServices.UpdateDefaultSetting(
        subject,
        fontSize,
        version
      );

      if (result.status) {
        return res.status(result.code).json({ setting: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  getShareText: async (req, res, next) => {
    try {
      const result = await SettingServices.GetShareText();

      if (result.status) {
        return res.status(result.code).json({ shareText: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updateShareText: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }
      const { shareText } = req.body;
      const result = await SettingServices.UpdateShareText(shareText);

      if (result.status) {
        return res.status(result.code).json({ shareText: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = settingController;
