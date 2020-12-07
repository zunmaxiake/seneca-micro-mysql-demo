module.exports = function () {
  try {
    const moduleName = "poetry";
    const Plugin = require("./common/plugin");
    const config = require("./config/dev").config;
    const modelPath = __dirname + "/models/";
    const controllerPath = __dirname + "/controllers/";
    const models = Plugin.loadModels(this, moduleName, modelPath, config.db);
    Plugin.loadControllers(this, moduleName, controllerPath, models);

    //自动生成表结构，需要事先手动建立数据库
    if (models) {
      models.sequelize.sync()
        .then(() => {
          console.log(moduleName, "  all models sync completed");
        })
        .catch(err => {
          console.log("sync db err:", err)
        })
    }
  }
  catch (err) {
    console.log("err:", err);
  }
}