const SettingModel = require("../models/Setting");
const ShareTextModel = require("../models/ShareText");
const Response = require("../ulti/response");

exports.SettingServices = {
  GetSetting: async (udid) => {
    const setting = await SettingModel.findOne({ udid: udid });
    if (setting) return setting;

    const defaultSetting = await SettingModel.findOne({ udid: "default" });
    const newSetting = {
      udid: udid,
      app: defaultSetting.app,
      arabicFont: defaultSetting.arabicFont,
      subject: defaultSetting.subject,
    };
    const result = await SettingModel.create(newSetting);
    return result;
  },
  UpdateSetting: async (udid, setting) => {
    let count = 0;
    for (const lang of setting.subject.options) {
      if (lang.isCheck) count++;
    }
    if (count === 0) setting.subject.options[0].isCheck = true;
    const result = await SettingModel.updateOne(
      { udid: udid },
      {
        app: setting.app,
        arabicFont: setting.arabicFont,
        subject: setting.subject,
      },
      { new: true }
    );
    const updatedSetting = await SettingModel.findOne({ udid: udid });
    return updatedSetting;
  },
  ResetSetting: async (udid) => {
    const defaultSetting = await SettingModel.findOne({ udid: "default" });
    const result = await SettingModel.findOneAndUpdate(
      { udid: udid },
      {
        app: defaultSetting.app,
        arabicFont: defaultSetting.arabicFont,
        subject: defaultSetting.subject,
      },
      { new: true }
    );
    const resetSetting = await SettingModel.findOne({ udid: udid });
    return resetSetting;
  },
  /*----------------------*/
  /*----------------------*/
  GetSettingList: async () => {
    const response = new Response();
    const setting = await SettingModel.findOne({ udid: "default" });
    if (setting) response.setSuccess(200, setting);
    else response.setError(404, "Not Found");
    return response;
  },
  UpdateDefaultSetting: async (subject, fontSize, version) => {
    const response = new Response();
    const setting = await SettingModel.findOne({ udid: "default" });
    //#region version
    setting.app.version.name = version.name.value;
    setting.app.version.copyright = version.copyright.value;
    //#endregion

    //#region font size
    setting.arabicFont.value = fontSize.defaultValue.value;
    setting.arabicFont.max = fontSize.max.value;
    setting.arabicFont.min = fontSize.min.value;
    setting.arabicFont.text = fontSize.text.value;
    //#endregion

    //#region subject
    setting.subject.options[0].isCheck = subject.arabic.value;
    setting.subject.options[1].isCheck = subject.transliteration.value;
    setting.subject.options[2].isCheck = subject.translation.value;
    //#endregion

    await setting.save();
    response.setSuccess(200, "success");
    return response;
  },
  GetShareText: async () => {
    const response = new Response();
    const shareText = await ShareTextModel.findOne({ name: "default" });
    response.setSuccess(200, shareText);
    return response;
  },
  UpdateShareText: async (shareText) => {
    const response = new Response();
    await ShareTextModel.updateOne(
      { name: "default" },
      { text: shareText.value }
    );
    response.setSuccess(200, "success");
    return response;
  },
};
