const CommentModel = require("../models/Comment");

exports.CommentServices = {
  create: (udid, content, announcementId) => {
    return CommentModel.create({ udid, content, announcementId });
  },
  update: (id, udid, content, announcementId) => {
    return CommentModel.updateOne(
      { _id: id },
      { udid, content, announcementId }
    );
  },
  getList: () => {
    return CommentModel.find();
  },
  delete: (id) => {
    return CommentModel.deleteOne({ _id: id });
  },
  getByAnnouncementId: (id) => {
    return CommentModel.find({ announcementId: id });
  },
  checkOwner: async (id, udid) => {
    const comment = await CommentModel.findOne({ _id: id });
    if (comment.udid !== udid) throw new Error("This is not your comment");
  },
};
