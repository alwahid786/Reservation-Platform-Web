const { validationResult } = require("express-validator");
const { CommentServices } = require("../../services/comment");
const Response = require("../../ulti/response");

const commentController = {
  create: async (req, res, next) => {
    const { udid, content, announcementId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid Input" });
    }
    let result = null;
    try {
      result = await CommentServices.create(udid, content, announcementId);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ comment: result });
  },
  // update: async (req, res, next) => {
  //   const { id, udid, content, announcementId } = req.body;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ message: "Invalid Input" });
  //   }
  //   let result = null;
  //   try {
  //     result = await CommentServices.update(id, udid, content, announcementId);
  //   } catch (error) {
  //     return next(error);
  //   }
  //   return res.status(200).json({ comment: result });
  // },
  delete: async (req, res, next) => {
    const { id, udid } = req.query;
    let result = null;
    try {
      await CommentServices.checkOwner(id, udid);
      result = await CommentServices.delete(id);
    } catch (error) {
      if (error.message === "This is not your comment") error.status = 422;
      return next(error);
    }
    return res.status(200).json({ comment: result });
  },
  getByAnnouncementId: async (req, res, next) => {
    const { id } = req.params;
    let result = null;
    try {
      result = await CommentServices.getByAnnouncementId(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ comment: result });
  },
};

module.exports = commentController;
