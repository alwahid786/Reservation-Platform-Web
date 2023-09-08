const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");
const RoleModel = require("../models/Role");
const Response = require("../ulti/response");
const { config } = require("../config");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'haiderkodex@gmail.com', // Your Gmail email address
    pass: 'fufjufatxxoafhjj', // Your Gmail password or app password
  },
});
exports.AuthServices = {
  CheckUser: async (email, password) => {
    const response = new Response();
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      response.setError(422, "Email doesn't exist");
      return response;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      response.setError(422, "Password doesn't match");
      return response;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      config.tokenSecret
    );
    response.setSuccess(200, { token: token });
    return response;
  },
  RegisterUser: async (email, password, name) => {
    const response = new Response();
    const isExist = await UserModel.findOne({ email: email });
    if (isExist) {
      response.setError(422, "This email already exists");
      return response;
    }

    const role = await RoleModel.findOne({ name: "support" });

    const newUser = {
      email: email,
      password: "",
      name: name,
      role: role._id,
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    newUser.password = hashedPassword;

    const body = await UserModel.create(newUser);

    const createdUser = {
      _id: body._id,
      name: body.name,
      email: body.email,
      role: role,
    };

    response.setSuccess(201, createdUser);

    const mailOptions = {
      from: 'haiderkodex@gmail.com', // Use the same Gmail address used in the nodemailer configuration
      to: email, // Recipient's email address (the one provided during registration)
      subject: 'Successful Registration', // Subject of the email
      text: `Dear ${name},\n\nThank you for registering on our platform!\n\nSincerely,\nDjanazah Gebeden Support Team`, // Email content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return response;
  },
  UpdateUserInfo: async (name, userId) => {
    const response = new Response();
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { name: name }
    );
    response.setSuccess(200, updatedUser);
    return response;
  },
  UpdateUserPassword: async (oldPassword, newPassword, userId) => {
    const response = new Response();

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      response.setError(422, "User doesn't exist");
      return response;
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      response.setError(422, "Password doesn't match");
      return response;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { password: hashedPassword }
    );
    response.setSuccess(200, "Update Success");
    return response;
  },
  UpdateSupportInfo: async (name, userId) => {
    const response = new Response();
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { name: name }
    );
    response.setSuccess(200, updatedUser);
    return response;
  },
  UpdateSupportPassword: async (newPassword, userId) => {
    const response = new Response();
    const user = await UserModel.findOne({ _id: userId }).populate("role");
    if (!user) {
      response.setError(422, "Support doesn't exist");
      return response;
    }

    if (user.role.name !== "support") {
      response.setError(422, "Support doesn't exist");
      return response;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { password: hashedPassword }
    );
    response.setSuccess(200, "Update Success");
    return response;
  },
  GetUserInfo: async (userId) => {
    const response = new Response();
    const user = await UserModel.findOne({ _id: userId }, "-password").populate(
      "role"
    );

    if (!user) {
      response.setError(404, "User doesn't exist");
      return response;
    }
    response.setSuccess(200, user);
    return response;
  },
  GetSupportInfo: async (userId) => {
    const response = new Response();
    const support = await UserModel.findOne(
      { _id: { $ne: userId } },
      "-password"
    ).populate("role");

    if (!support) {
      response.setError(404, "Support doesn't exist");
      return response;
    }
    response.setSuccess(200, support);
    return response;
  },
  DeleteSupport: async (userId) => {
    const response = new Response();
    const supportRole = await RoleModel.findOne({ name: "support" });
    const support = await UserModel.findOne({
      _id: userId,
      role: supportRole._id,
    });

    if (!support) {
      response.setError(404, "User doesn't exist");
      return response;
    }
    await support.deleteOne();
    response.setSuccess(200, "Delete Success");
    return response;
  },
  CheckSupport: async (userId) => {
    const response = new Response();
    const user = await UserModel.findOne({
      _id: userId,
    });
    if (!user) {
      response.setError(404, "User doesn't exist");
      return response;
    }
    const supportRole = await RoleModel.findOne({ _id: user.role });
    if (supportRole) {
      if (supportRole.name === "support") response.setSuccess(200, true);
      else response.setSuccess(200, false);
    } else {
      response.setError(404, "Role doesn't exist");
      return response;
    }
    return response;
  },
};
