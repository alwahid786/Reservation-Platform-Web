exports.config = {
  /**
   * Your favorite port
   */
  port: 1122,

  /**
   * That long string from mlab
   */
  databaseURL:
    // "mongodb://localhost:27017/djanazahgebeden",
    // "mongodb://djanazahroot:zxcvdb32jf2@localhost:27017/djanazahgebeden",
    "mongodb+srv://wahidkodex:BFF08tOPCIjPrGA2@cluster0.joq2wzs.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  // jwtSecret: process.env.JWT_SECRET,

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },

  /**
   * Token Secret
   */
  tokenSecret:
    "4f6ab2a1ebc75a4adc9b26cf93d18f90784f69d5eeb56bbf82f79ab7f37c77ee7242c2c67a6a381ae4ba142dc1349a63f870f5187a5aeb58b0391631ff9eebfc",

  /**
   * Backend Url
   */
  backendUrl: "http:kodextech.net:1122",
};
