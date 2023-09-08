const fs = require("fs");

exports.loadTemplate = () => {
  return new Promise((resolve, reject) => {
    // const isWin = process.platform.includes("win");
    const folder = __dirname.replace("ulti", "template");
    let path = "/email.html";
    path = fs.readFile(folder + path, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
