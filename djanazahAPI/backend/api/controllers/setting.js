const { SettingServices } = require("../../services/setting");

const settingController = {
  getSetting: async (req, res, next) => {
    try {
      const udid = req.params.udid;

      const setting = await SettingServices.GetSetting(udid);
      res.status(200).json(setting);
    } catch (error) {
      next(error);
    }
  },
  updateSetting: async (req, res, next) => {
    try {
      const udid = req.body.udid;
      const setting = req.body.setting;

      const updatedSetting = await SettingServices.UpdateSetting(udid, setting);
      res.status(200).json(updatedSetting);
    } catch (error) {
      next(error);
    }
  },
  resetSetting: async (req, res, next) => {
    try {
      const udid = req.body.udid;

      const resetSetting = await SettingServices.ResetSetting(udid);
      res.status(200).json(resetSetting);
    } catch (error) {
      next(error);
    }
  },
  getShareText: async (req, res, next) => {
    try {
      const shareText = await SettingServices.GetShareText();
      res.status(200).json({ shareText: shareText.body });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = settingController;
