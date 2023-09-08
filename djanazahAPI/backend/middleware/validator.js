const { body, check } = require("express-validator");

exports.login = () => {
  return [
    body("email").trim().normalizeEmail().isEmail(),
    body("password")
      .trim()
      .custom((value) => {
        const check = value.match(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/g
        );
        if (check !== null) return true;
        return false;
      }),
  ];
};

exports.register = () => {
  return [
    body("email").trim().normalizeEmail().isEmail(),
    body("password")
      .trim()
      .custom((value) => {
        const check = value.match(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/g
        );
        if (check !== null) return true;
        return false;
      }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => value === req.body.password),
    body("name").trim().notEmpty(),
  ];
};

exports.userInfo = () => {
  return [body("name").trim().notEmpty()];
};

exports.supportInfo = () => {
  return [body("name").trim().notEmpty(), body("userId").trim().notEmpty()];
};

exports.password = () => {
  return [
    body("oldPassword")
      .trim()
      .custom((value) => {
        const check = value.match(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/g
        );
        if (check !== null) return true;
        return false;
      }),
    body("newPassword")
      .trim()
      .custom((value) => {
        const check = value.match(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/g
        );
        if (check !== null) return true;
        return false;
      }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => value === req.body.newPassword),
  ];
};

exports.supportPassword = () => {
  return [
    body("userId").trim().notEmpty(),
    body("newPassword")
      .trim()
      .custom((value) => {
        const check = value.match(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/g
        );
        if (check !== null) return true;
        return false;
      }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => value === req.body.newPassword),
  ];
};

exports.subject = () => {
  return [
    body("title.value").trim().notEmpty(),
    body("category.*.name.value").trim().notEmpty(),
    body("category.*.content.langara.value").trim().notEmpty(),
    body("category.*.content.langeng.value").trim().notEmpty(),
    body("category.*.content.langtranslit.value").trim().notEmpty(),
  ];
};

exports.faq = () => {
  return [
    body("title.value").trim().notEmpty(),
    body("faqContents.*.content.value").trim().notEmpty(),
    body("faqContents.*.name.value").trim().notEmpty(),
  ];
};

exports.contact = () => {
  return [
    body("info.*.name").trim().notEmpty(),
    body("info.*.value").trim().notEmpty(),
  ];
};

exports.setting = () => {
  return [
    body("subject.arabic.value").trim().notEmpty(),
    body("subject.transliteration.value").trim().notEmpty(),
    body("subject.translation.value").trim().notEmpty(),
    body("fontSize.min.value").trim().notEmpty(),
    body("fontSize.max.value").trim().notEmpty(),
    body("fontSize.defaultValue.value").trim().notEmpty(),
    body("fontSize.text.value").trim().notEmpty(),
    body("version.name.value").trim().notEmpty(),
    body("version.copyright.value").trim().notEmpty(),
  ];
};

exports.shareText = () => {
  return [body("shareText.value").trim().notEmpty()];
};

exports.area = () => {
  return [
    body("country.name.value").trim().notEmpty(),
    body("provinces.*.name.value").trim().notEmpty(),
  ];
};

exports.advertisement = () => {
  return [
    body("advertisements.*.name.value").trim().notEmpty(),
    body("advertisements.*.ios.value").trim().notEmpty(),
    body("advertisements.*.android.value").trim().notEmpty(),
    body("advertisements.*.isActive.value").trim().notEmpty(),
    body("admobs.*.adId.ios.value").trim().notEmpty(),
    body("admobs.*.adId.android.value").trim().notEmpty(),
    body("admobs.*.isActive.value").trim().notEmpty(),
    body("admobs.*.name.value").trim().notEmpty(),
  ];
};

exports.timeSetting = () => {
  return [
    body("adsDelay.value").trim().matches(/^\d+$/),
    body("fullAdDelay.value").trim().matches(/^\d+$/),
    body("allowCreateDelay.value").trim().matches(/^\d+$/),
  ];
};
