const TimeSettingModel = require("../models/TimeSetting");
const Response = require("../ulti/response");

exports.TimeSettingServices = {
  GetTimeSettingApp: async () => {
    const timeSetting = await TimeSettingModel.findOne({ name: "default" });
    if (timeSetting) return timeSetting;
  },
  /*----------------------*/
  /*----------------------*/
  GetTimeSetting: async () => {
    const response = new Response();
    const timeSetting = await TimeSettingModel.findOne({ name: "default" });
    if (timeSetting) response.setSuccess(200, timeSetting);
    else response.setError(404, "Not Found");
    return response;
  },
  UpdateTimeSetting: async (adsDelay, fullAdDelay, allowCreateDelay) => {
    const response = new Response();
    const timeSetting = await TimeSettingModel.findOne({ name: "default" });

    timeSetting.adsDelay = +adsDelay.value * 1000; // seconds
    timeSetting.fullAdDelay = +fullAdDelay.value * 60000; // minutes
    timeSetting.allowCreateDelay = +allowCreateDelay.value; // minutes

    await timeSetting.save();
    response.setSuccess(200, "success");
    return response;
  },
};
