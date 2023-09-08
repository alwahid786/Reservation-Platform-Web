const SubjectModel = require("../models/Subject");
const SubjectCategoryModel = require("../models/SubjectCategory");
const DeviceModel = require("../models/Device");

const Response = require("../ulti/response");

exports.SubjectServices = {
  GetList: async (udid) => {
    const device = await DeviceModel.findOne({ udid: udid });
    const tableContentId = {};
    for (const contentId of device.favorites) {
      tableContentId[contentId] = 1;
    }
    let subjectList = await SubjectModel.find().populate("categoryId").lean();

    for (const subject of subjectList) {
      for (const content of subject.categoryId) {
        content.isFavorite = tableContentId[content._id] ? true : false;
      }
    }

    return subjectList;
  },
  Create: async (subject) => {
    const newSubject = new SubjectModel(subject);
    const result = await newSubject.save();
    return result;
  },
  /*----------------------*/
  /*----------------------*/
  GetSubjectList: async () => {
    const response = new Response();
    const subjectList = await SubjectModel.find().populate("categoryId");
    response.setSuccess(200, subjectList);
    return response;
  },
  GetSubjectCategory: async (id) => {
    const response = new Response();
    const category = await SubjectCategoryModel.find({ _id: id });
    if (!category) {
      response.setError(422, "Category not found");
      return response;
    }
    response.setSuccess(200, category);
    return response;
  },
  CreateSubject: async (title, category) => {
    const response = new Response();
    const categories = [];
    for (const item of category) {
      const content = {
        langAra: item.content.langara.value,
        langEng: item.content.langeng.value,
        langTranslit: item.content.langtranslit.value,
      };
      categories.push({ name: item.name.value, content: content });
    }

    const newCategories = await SubjectCategoryModel.create(categories);
    const newSubject = {
      title: title.value,
      categoryId: newCategories.map((item) => item._id),
    };
    await SubjectModel.create(newSubject);
    response.setSuccess(200, "success");
    return response;
  },
  UpdateSubject: async (title, category) => {
    const response = new Response();
    const subject = await SubjectModel.findOne({ _id: title.id });
    const categoryDeleteMap = {};
    for (const item of subject.categoryId) {
      categoryDeleteMap[item._id] = 1;
    }
    //#region Seperate New and Delete
    const categories = [];
    const newCategories = [];
    for (const item of category) {
      if (item.name.id !== "") {
        if (categoryDeleteMap[item.name.id]) {
          delete categoryDeleteMap[item.name.id];
          const content = {
            langAra: item.content.langara.value,
            langEng: item.content.langeng.value,
            langTranslit: item.content.langtranslit.value,
          };
          await SubjectCategoryModel.updateOne(
            {
              _id: item.name.id,
            },
            {
              name: item.name.value,
              content: content,
            }
          );
          categories.push(item.name.id);
        }
      } else {
        const content = {
          langAra: item.content.langara.value,
          langEng: item.content.langeng.value,
          langTranslit: item.content.langtranslit.value,
        };
        newCategories.push({ name: item.name.value, content: content });
      }
    }
    //#endregion

    //#region Delete
    const deletedCategory = [];
    for (const id in categoryDeleteMap) {
      deletedCategory.push(id);
    }
    if (deletedCategory.length > 0)
      await SubjectCategoryModel.deleteMany({
        _id: { $in: deletedCategory },
      });
    //#endregion

    //#region Create
    if (newCategories.length > 0) {
      const createdCategory = await SubjectCategoryModel.create(newCategories);
      for (const item of createdCategory) {
        categories.push(item._id);
      }
    }
    //#endregion

    const updatedSubject = {
      title: title.value,
      categoryId: categories,
    };
    await SubjectModel.updateOne({ _id: title.id }, updatedSubject);
    response.setSuccess(200, "success");
    return response;
  },
  RemoveSubject: async (id) => {
    const response = new Response();
    const deletedSubject = await SubjectModel.findOne({ _id: id });
    if (deletedSubject) {
      await deletedSubject.deleteOne();
      response.setSuccess(200, "success");
    } else response.setError(404, "Not found");
    return response;
  },
};
