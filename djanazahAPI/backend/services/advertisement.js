const AdvertisementModel = require("../models/Advertisement");
const AdmobModel = require("../models/Admob");
const Response = require("../ulti/response");

const { DeleteFile } = require("../ulti/remove-file");

exports.AdvertisementServices = {
  GetListAdvertisements: async () => {
    const result = await AdvertisementModel.find();
    return result;
  },
  GetAdmob: async () => {
    const result = await AdmobModel.find();
    return result;
  },
  /*----------------------*/
  /*----------------------*/
  GetAdvertisements: async () => {
    const response = new Response();
    const advertisements = await AdvertisementModel.find();
    const admobs = await AdmobModel.find();
    response.setSuccess(200, {
      advertisements: advertisements,
      admobs: admobs,
    });
    return response;
  },
  UpdateAdImages: async (image, id) => {
    const response = new Response();
    const updatedAdvertisement = await AdvertisementModel.findOne({ _id: id });
    if (image) {
      DeleteFile(updatedAdvertisement.image);
      await AdvertisementModel.updateOne(
        { _id: id },
        { image: "/" + image.path }
      );
    }
    response.setSuccess(200, "success");
    return response;
  },
  UpdateAds: async (advertisements, admobs) => {
    const response = new Response();

    const updatedAdvertisements = await AdvertisementModel.find();
    const updatedAdmobs = await AdmobModel.find();

    updatedAdvertisements.map(async (ads, index) => {
      return await AdvertisementModel.updateOne(
        { _id: ads._id },
        {
          name: advertisements[index].name.value,
          ios: advertisements[index].ios.value,
          android: advertisements[index].android.value,
          image: updatedAdvertisements[index].image,
          isActive: advertisements[index].isActive.value,
        }
      );
    });

    updatedAdmobs.map(async (ads, index) => {
      return await AdmobModel.updateOne(
        { _id: ads._id },
        {
          adId: {
            ios: admobs[index].adId.ios.value,
            android: admobs[index].adId.android.value,
          },
          isActive: admobs[index].isActive.value,
          name: admobs[index].name.value,
        }
      );
    });

    response.setSuccess(200, "success");
    return response;
  },
};
