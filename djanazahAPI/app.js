const express = require("express");

const { config } = require("./backend/config/index");
const { loaders } = require("./backend/loaders/index");
const { seeding } = require("./backend/seed/index");

async function startServer() {
  const app = express();

  await loaders(app);

  await seeding();

  app.listen(config.port, (err) => {
    if (err) {
      // process.exit(1);
      return;
    }
    console.log(`Server is running at port ${config.port}`);
  });
}

startServer(); 
