const path = require("path");

module.exports = function () {
  const moduleName = "ip";
  try {
    const Plugin = require("./common/plugin");
    const controllerPath = path.join(__dirname, "/controllers/");
    const modelPath = path.join(__dirname, "/models/");
    const config = require("./config/dev").config;
    const models = Plugin.loadModels(this, modelPath, moduleName, config.db);
    Plugin.loadControllers(this, controllerPath, models, moduleName);
  }
  catch (err) {
    console.log("err:", err);
  }
}