const ContactModel = require("../models/Contact");
const Response = require("../ulti/response");

exports.ContactServices = {
  GetContact: async () => {
    const contact = await ContactModel.findOne({ name: "default" });
    return contact.info;
  },
  /*----------------------*/
  /*----------------------*/
  GetContactList: async () => {
    const response = new Response();
    const contact = await ContactModel.findOne({ name: "default" });
    if (contact) response.setSuccess(200, contact);
    else response.setError(404, "Not Found");
    return response;
  },
  UpdateContact: async (info) => {
    const response = new Response();
    await ContactModel.updateOne(
      { name: "default" },
      {
        info: info,
      }
    );
    response.setSuccess(200, "success");
    return response;
  },
};
