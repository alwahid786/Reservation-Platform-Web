const { Router } = require("express");
const { subjectRoutes } = require("./routes/subject");
const { deviceRoutes } = require("./routes/device");
const { settingRoutes } = require("./routes/setting");
const { contactRoutes } = require("./routes/contact");
const { areaRoutes } = require("./routes/area");
const { faqRoutes } = require("./routes/faq");
const { announcementRoutes } = require("./routes/announcement");
const { advertisementRoutes } = require("./routes/advertisement");
const { timeSettingRoutes } = require("./routes/time-setting");

exports.apiRoutes = () => {
  const app = Router();
  subjectRoutes(app);
  deviceRoutes(app);
  settingRoutes(app);
  contactRoutes(app);
  areaRoutes(app);
  faqRoutes(app);
  announcementRoutes(app);
  advertisementRoutes(app);
  timeSettingRoutes(app);
  return app;
};
