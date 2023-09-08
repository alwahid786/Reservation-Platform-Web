const { validationResult } = require("express-validator");
const { AnnouncementServices } = require("../../services/announcement");

const announcementController = {
  getAnnouncement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await AnnouncementServices.GetSingleAnnouncement(id);
      const gender = await AnnouncementServices.GetGenderList();
      if (result.status) {
        return res.status(result.code).json({
          announcement: result.body,
          gender: gender.body,
        });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  getListAnnouncement: async (req, res, next) => {
    try {
      const { page, search } = req.query;
      const result = await AnnouncementServices.GetPaginatedAnnouncement(
        page,
        search
      );
      const gender = await AnnouncementServices.GetGenderList();

      if (result.status) {
        return res.status(result.code).json({
          announcement: result.body,
          gender: gender.body,
        });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { formValue } = req.body;
      const result = await AnnouncementServices.CreateAdminAnnouncement(
        formValue
      );

      if (result.status) {
        // await AnnouncementServices.SendNotificationById(
        //   result.body._id,
        //   "create"
        // );
        result.body = "success";
        return res.status(result.code).json({ announcement: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { formValue } = req.body;
      const result = await AnnouncementServices.UpdateDeviceAnnouncement(
        formValue
      );

      if (result.status) {
        return res.status(result.code).json({ announcement: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await AnnouncementServices.DeleteDeviceAnnouncement(id);

      if (result.status) {
        if (result.udid !== "deleted") {
          // await AnnouncementServices.SendNotificationById(
          //   result.body._id,
          //   "delete",
          //   result.body
          // );
        }
        return res.status(result.code).json({ announcement: "success" });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  pushNotification: async (req, res, next) => {
    try {
      const { announcementId } = req.params;
      // const warning = await AnnouncementServices.SendEmail();
      await AnnouncementServices.SendNotificationById(announcementId, "update");
      // if (warning !== "") return res.status(200).json({ sent: warning });
      return res.status(200).json({ sent: "success" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = announcementController;
