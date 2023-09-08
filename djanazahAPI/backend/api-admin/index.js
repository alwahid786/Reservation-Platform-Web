const { Router } = require("express");
const { authRoutes } = require("./routes/auth");
const { subjectRoutes } = require("./routes/subject");
const { faqRoutes } = require("./routes/faq");
const { contactRoutes } = require("./routes/contact");
const { settingRoutes } = require("./routes/setting");
const { areaRoutes } = require("./routes/area");
const { advertisementRoutes } = require("./routes/advertisement");
const { announcementRoutes } = require("./routes/announcement");
const { dashboardRoutes } = require("./routes/dashboard");
const { timeSettingRoutes } = require("./routes/time-setting");

exports.adminRoutes = () => {
  const app = Router();
  authRoutes(app);
  subjectRoutes(app);
  faqRoutes(app);
  contactRoutes(app);
  settingRoutes(app);
  areaRoutes(app);
  advertisementRoutes(app);
  announcementRoutes(app);
  dashboardRoutes(app);
  timeSettingRoutes(app);
  return app;
};
