const { mongooseLoader } = require("./mongoose");
const { expressLoader } = require("./express");

exports.loaders = async (expressApp) => {
  await mongooseLoader();
  console.log("Mongoose connected !");

  await expressLoader(expressApp);
  console.log("Express connected !");
};
