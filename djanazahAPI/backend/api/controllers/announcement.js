const { AnnouncementServices } = require("../../services/announcement");

const announcementController = {
  getListAnnouncement: async (req, res, next) => {
    try {
      const { udid, date } = req.params;

      const result = await AnnouncementServices.GetListAnnouncement(udid, date);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  createAnnouncement: async (req, res, next) => {
    try {
      const { udid, formValue, date } = req.body;
      console.log(req.body);
      const isCreated = await AnnouncementServices.CreateAnnouncement(
        udid,
        formValue
      );
      if (isCreated.status) {
        // await AnnouncementServices.SendNotification(
        //   isCreated.data,
        //   udid,
        //   "create"
        // );
        const result = await AnnouncementServices.GetListAnnouncement(
          udid,
          date
        );
        res.status(200).json(result);
      } else {
        console.log(JSON.stringify(result));
        res.status(400).json(result.message);
      } 
    } catch (error) {
      console.log(error)
      next(error);
    }
  },
  deleteAnnouncement: async (req, res, next) => {
    try {
      const { udid, id, date } = req.params;

      const isDeleted = await AnnouncementServices.DeleteAnnouncement(id, udid);
      if (isDeleted.status) {
        // await AnnouncementServices.SendNotification(
        //   id,
        //   udid,
        //   "delete",
        //   isDeleted.announcement
        // );
        const result = await AnnouncementServices.GetListAnnouncement(
          udid,
          date
        );
        res.status(200).json(result);
      } else {
        res.status(400).json("Announcement doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  },
  getAnnouncement: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await AnnouncementServices.GetAnnouncement(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  updateAnnouncement: async (req, res, next) => {
    try {
      const { id, udid, formValue, date } = req.body;
      const isUpdated = await AnnouncementServices.UpdateAnnouncement(
        id,
        formValue
      );
      if (isUpdated) {
        // await AnnouncementServices.SendNotification(id, udid, "update");
        const result = await AnnouncementServices.GetListAnnouncement(
          udid,
          date
        );
        res.status(200).json(result);
      } else res.status(400).json(result.message);
    } catch (error) {
      next(error);
    }
  },
  checkAllowCreate: async (req, res, next) => {
    try {
      const { udid } = req.params;
      const result = await AnnouncementServices.CheckCreate(udid);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = announcementController;
