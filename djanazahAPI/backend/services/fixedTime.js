const FixedTimeModel = require("../models/FixedTime");

exports.FixedTimeServices = {
  create: (name) => {
    return FixedTimeModel.create({ name });
  },
  update: (id, name) => {
    return FixedTimeModel.updateOne({ _id: id }, { name });
  },
  getList: () => {
    return FixedTimeModel.find();
  },
  delete: (id) => {
    return FixedTimeModel.deleteOne({ _id: id });
  },
};
