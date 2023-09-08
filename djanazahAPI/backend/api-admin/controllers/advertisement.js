const { validationResult } = require("express-validator");
const { AdvertisementServices } = require("../../services/advertisement");
const { DeleteFile } = require("../../ulti/remove-file");

const contactController = {
  getAdvertisement: async (req, res, next) => {
    try {
      const result = await AdvertisementServices.GetAdvertisements();

      if (result.status) {
        return res.status(result.code).json({ ads: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updateImage: async (req, res, next) => {
    try {
      const image = req.file;
      const { id } = req.body;
      const result = await AdvertisementServices.UpdateAdImages(image, id);

      if (result.status) {
        return res.status(result.code).json({ ads: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      DeleteFile( req.file.path);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }
      const { advertisements, admobs } = req.body;
      const result = await AdvertisementServices.UpdateAds(
        advertisements,
        admobs
      );

      if (result.status) {
        return res.status(result.code).json({ ads: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = contactController;
