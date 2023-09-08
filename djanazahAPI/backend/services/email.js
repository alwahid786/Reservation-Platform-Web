const EmailModel = require("../models/Email");

exports.EmailServices = {
  create: (email, password, isDefault) => {
    return EmailModel.create({ email, password, isDefault });
  },
  update: (id, email, password) => {
    return EmailModel.updateOne({ _id: id }, { email, password });
  },
  updateWithoutPass: (id, email) => {
    return EmailModel.updateOne({ _id: id }, { email });
  },
  getList: () => {
    return EmailModel.find().select("-password");
  },
  delete: (id) => {
    return EmailModel.deleteOne({ _id: id });
  },
  checkEmpty: async () => {
    const list = await EmailModel.find();
    if (list.length === 0) return true;
    return false;
  },
  setDefault: async (id) => {
    await EmailModel.updateOne({ isDefault: true }, { isDefault: false });
    return EmailModel.updateOne({ _id: id }, { isDefault: true });
  },
};
