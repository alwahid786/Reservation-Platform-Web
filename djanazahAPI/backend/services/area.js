const CountryModel = require("../models/Country");
const ProvinceModel = require("../models/Province");
const DeviceModel = require("../models/Device");
const Response = require("../ulti/response");
const { AnnouncementServices } = require("./announcement");
const AnnouncementModel = require("../models/Announcement");

exports.AreaServices = {
  GetListArea: async () => {
    const result = await CountryModel.find().populate("provinces");
    return result;
  },
  /*----------------------*/
  /*----------------------*/
  GetListLocation: async () => {
    const response = new Response();
    const result = await CountryModel.find().populate("provinces");
    if (result) response.setSuccess(200, result);
    else response.setError(404, "Not Found");
    return response;
  },
  CreateArea: async (country, provinces) => {
    const response = new Response();
    const tempProvinces = [];
    for (const province of provinces) {
      tempProvinces.push({ name: province.name.value });
    }
    const newProvinces = await ProvinceModel.create(tempProvinces);
    const newCountry = {
      name: country.name.value,
      provinces: newProvinces.map((province) => province._id) || [],
    };
    await CountryModel.create(newCountry);
    response.setSuccess(200, "success");
    return response;
  },
  UpdateArea: async (country, provinces) => {
    const response = new Response();
    const existedCountry = await CountryModel.findOne({ _id: country.name.id });
    const provinceDeleteMap = {};
    for (const item of existedCountry.provinces) {
      provinceDeleteMap[item._id] = 1;
    }
    //#region Seperate New and Delete
    const finalProvinces = [];
    const newProvinces = [];
    for (const item of provinces) {
      if (item.name.id !== "") {
        if (provinceDeleteMap[item.name.id]) {
          delete provinceDeleteMap[item.name.id];
          await ProvinceModel.updateOne(
            {
              _id: item.name.id,
            },
            {
              name: item.name.value,
            }
          );
          finalProvinces.push(item.name.id);
        }
      } else {
        newProvinces.push({ name: item.name.value });
      }
    }
    //#endregion

    //#region Delete
    const deletedProvinces = [];
    for (const id in provinceDeleteMap) {
      deletedProvinces.push(id);
    }

    let announcementList = [];
    for (const province of deletedProvinces) {
      const announcement = await AnnouncementModel.findOne({
        "janazahDetails.province": province,
      });
      if (announcement) announcementList.push(announcement);
    }
    if (announcementList.length > 0) {
      response.setError(
        422,
        "This province has some announcements,it can't be removed."
      );
      return response;
    }

    //#region update picked location
    const tableDeletedProvinces = {};
    for (const id of deletedProvinces) {
      tableDeletedProvinces[id] = 1;
    }

    const devices = await DeviceModel.find({
      listLocation: { $in: deletedProvinces },
    });
    for (const device of devices) {
      const list = [];
      for (const id of device.listLocation) {
        if (!tableDeletedProvinces[id]) list.push(id);
      }
      await DeviceModel.updateOne({ _id: device._id }, { listLocation: list });
    }
    //#endregion

    if (deletedProvinces.length > 0)
      await ProvinceModel.deleteMany({
        _id: { $in: deletedProvinces },
      });
    //#endregion

    //#region Create
    if (newProvinces.length > 0) {
      const createdProvinces = await ProvinceModel.create(newProvinces);
      for (const item of createdProvinces) {
        finalProvinces.push(item._id);
      }
    }
    //#endregion

    const updatedCountry = {
      name: country.name.value,
      provinces: finalProvinces,
    };
    await CountryModel.updateOne({ _id: country.name.id }, updatedCountry);
    response.setSuccess(200, "success");
    return response;
  },
  DeleteArea: async (id) => {
    const response = new Response();
    const deletedCountry = await CountryModel.findOne({ _id: id });
    if (deletedCountry) {
      let announcementList = [];
      for (const id of deletedCountry.provinces) {
        const announcement = await AnnouncementModel.findOne({
          "janazahDetails.province": id,
        });
        if (announcement) announcementList.push(announcement);
      }

      if (announcementList.length > 0) {
        response.setError(
          422,
          "This area has some announcements,it can't be removed."
        );
        return response;
      }

      const countAnnouncement = await AnnouncementModel.countDocuments();
      if (countAnnouncement === 1) {
        response.setError(422, "Area can not be empty.");
        return response;
      }

      //#region update picked location
      const tableDeletedProvinces = {};
      for (const id of deletedCountry.provinces) {
        tableDeletedProvinces[id] = 1;
      }

      const devices = await DeviceModel.find({
        listLocation: { $in: deletedCountry.provinces },
      });
      for (const device of devices) {
        const list = [];
        for (const id of device.listLocation) {
          if (!tableDeletedProvinces[id]) list.push(id);
        }
        await DeviceModel.updateOne(
          { _id: device._id },
          { listLocation: list }
        );
      }
      //#endregion

      await deletedCountry.deleteOne();
      response.setSuccess(200, "success");
    } else response.setError(404, "Not found");

    return response;
  },
};
