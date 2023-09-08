const { AdvertisementServices } = require("../../services/advertisement");

const advertisementController = {
  getAdvertisements: async (req, res, next) => {
    try {
      const result = await AdvertisementServices.GetListAdvertisements();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  getAdmob: async (req, res, next) => {
    try {
      const result = await AdvertisementServices.GetAdmob();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = advertisementController;
