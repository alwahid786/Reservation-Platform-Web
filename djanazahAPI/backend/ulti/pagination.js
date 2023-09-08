const { config } = require("../config");

class Pagination {
  constructor(Model, route) {
    this.Model = Model;
    this.route = route;
  }

  getData = async (page, search, query, populate = null) => {
    page = +page;
    const limit = 8;
    const skip = (page - 1) * limit;
    let data;
    if (populate)
      data = await this.Model.find(query)
        .populate(populate)
        .skip(skip)
        .limit(limit)
        .sort([["janazahDetails.date", -1]]);
    else data = await this.Model.find(query).skip(skip).limit(limit);

    const length = await this.Model.where({}).countDocuments();

    const totalPage = Math.ceil(length / limit);

    let nextPage = page + 1;
    let prevPage = page - 1;

    //#region next and prev page
    if (nextPage > totalPage) nextPage = null;
    if (prevPage < 1) prevPage = null;
    //#endregion

    return {
      page: +page,
      totalPage: totalPage,
      data: data,
      nextPage: nextPage,
      prevPage: prevPage,
    };
  };
}

module.exports = Pagination;
