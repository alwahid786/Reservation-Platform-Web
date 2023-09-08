const { validationResult } = require("express-validator");
const { AuthServices } = require("../../services/auth");


const authController = {
  login: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { email, password } = req.body;
      const result = await AuthServices.CheckUser(email, password);
      if (result.status)
        return res.status(result.code).json({ token: result.body.token });
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { email, password, name } = req.body;
      const result = await AuthServices.RegisterUser(email, password, name);
      if (result.status) {
        return res.status(result.code).json({ newUser: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updateInfo: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { name } = req.body;
      const { userId } = req;
      const result = await AuthServices.UpdateUserInfo(name, userId);
      if (result.status) {
        return res.status(result.code).json({ updatedUser: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { oldPassword, newPassword } = req.body;
      const { userId } = req;

      const result = await AuthServices.UpdateUserPassword(
        oldPassword,
        newPassword,
        userId
      );
      if (result.status) {
        return res.status(result.code).json({ updatedPassword: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updateSupport: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { name, userId } = req.body;

      const result = await AuthServices.UpdateSupportInfo(name, userId);
      if (result.status) {
        return res.status(result.code).json({ updatedUser: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  updateSupportPassword: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { newPassword, userId } = req.body;

      const result = await AuthServices.UpdateSupportPassword(
        newPassword,
        userId
      );
      if (result.status) {
        return res.status(result.code).json({ updatedPassword: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  getUserInfo: async (req, res, next) => {
    try {
      const { userId, isSupport } = req;

      if (isSupport) {
        const result = await AuthServices.GetUserInfo(userId);
        if (result.status) {
          return res.status(result.code).json({ support: result.body });
        }
        return res.status(result.code).json({ message: result.message });
      } else {
        const result = await AuthServices.GetUserInfo(userId);

        if (result.status) {
          const support = await AuthServices.GetSupportInfo(userId);
          if (support.status) {
            return res
              .status(result.code)
              .json({ info: result.body, support: support.body });
          } else {
            return res.status(result.code).json({ info: result.body });
          }
        }
        return res.status(result.code).json({ message: result.message });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteSupport: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const result = await AuthServices.DeleteSupport(userId);

      if (result.status) {
        return res.status(result.code).json({ deleted: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  checkSupport: async (req, res, next) => {
    try {
      const { userId } = req;
      const result = await AuthServices.CheckSupport(userId);

      if (result.status) {
        return res.status(result.code).json({ isSupport: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = authController;
