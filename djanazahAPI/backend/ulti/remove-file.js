const fs = require("fs");
const path = require("path");

exports.DeleteFile = (filePath) => {
  if (filePath[0] != "/") filePath = "/" + filePath;
  let basePath = path.join(__dirname);
  basePath = basePath.replace(/\/backend\/ulti/g, "");
  fs.unlink(basePath + filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
