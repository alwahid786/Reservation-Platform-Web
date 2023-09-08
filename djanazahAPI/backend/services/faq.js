const FaqModel = require("../models/Faq");
const FaqContentModel = require("../models/FaqContent"); // do not delete
const Response = require("../ulti/response");

exports.FaqServices = {
  GetFaq: async () => {
    const faq = await FaqModel.find().populate("faqContents");
    return faq;
  },
  /*----------------------*/
  /*----------------------*/
  GetFaqList: async () => {
    const response = new Response();
    const faq = await FaqModel.find().populate("faqContents");
    response.setSuccess(200, faq);
    return response;
  },
  CreateFaq: async (title, faqContents) => {
    const response = new Response();

    const contents = faqContents.map((item) => {
      return {
        name: item.name.value,
        content: item.content.value,
        description: item.description.value,
      };
    });
    const newContents = await FaqContentModel.create(contents);
    const question = {
      title: title.value,
      faqContents: newContents.map((item) => item._id),
    };
    const newFaq = await FaqModel.create(question);
    if (newFaq) response.setSuccess(200, "success");
    else response.setError(422, "Some errors occur");
    return response;
  },
  UpdateFaq: async (title, faqContents) => {
    const response = new Response();
    const faq = await FaqModel.findOne({ _id: title.id });
    const faqContentDeleteMap = {};
    for (const item of faq.faqContents) {
      faqContentDeleteMap[item._id] = 1;
    }
    //#region Seperate New and Delete
    const faqs = [];
    const newFaqs = [];
    for (const item of faqContents) {
      if (item.name.id !== "") {
        if (faqContentDeleteMap[item.name.id]) {
          delete faqContentDeleteMap[item.name.id];
          await FaqContentModel.updateOne(
            {
              _id: item.name.id,
            },
            {
              name: item.name.value,
              content: item.content.value,
              description: item.description.value,
            }
          );
          faqs.push(item.name.id);
        }
      } else {
        newFaqs.push({
          name: item.name.value,
          content: item.content.value,
          description: item.description.value,
        });
      }
    }
    //#endregion

    //#region Delete
    const deletedFaqContents = [];
    for (const id in faqContentDeleteMap) {
      deletedFaqContents.push(id);
    }
    if (deletedFaqContents.length > 0)
      await FaqContentModel.deleteMany({
        _id: {
          $in: deletedFaqContents,
        },
      });
    //#endregion

    //#region Create
    if (newFaqs.length > 0) {
      const createdFaqContents = await FaqContentModel.create(newFaqs);
      for (const item of createdFaqContents) {
        faqs.push(item._id);
      }
    }
    //#endregion

    const updatedFaq = {
      title: title.value,
      faqContents: faqs,
    };
    await FaqModel.updateOne({ _id: title.id }, updatedFaq);
    response.setSuccess(200, "success");
    return response;
  },
  RemoveFaq: async (id) => {
    const response = new Response();
    const deletedFaq = await FaqModel.findOne({ _id: id });
    if (deletedFaq) {
      await deletedFaq.deleteOne();
      response.setSuccess(200, "success");
    } else response.setError(404, "Not found");
    return response;
  },
};
