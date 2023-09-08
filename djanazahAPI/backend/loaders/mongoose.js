const mongoose = require("mongoose");
const { config } = require("../config/index");

exports.mongooseLoader = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
