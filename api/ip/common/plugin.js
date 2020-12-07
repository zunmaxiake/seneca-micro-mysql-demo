const path = require("path");
const fs = require("fs");

module.exports = {
  loadModels: function (th, modelPath, moduleName, config) {
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(config.url, config.defult);
    let db = {};
    try {
      fs.readdirSync(modelPath)
        .filter(file => {
          return (file.indexOf(".") !== 0 && file.slice(-3) === ".js");
        })
        .forEach(file => {
          let model = sequelize["import"](path.join(modelPath, file));
          db[model.name] = model;
          addAct(moduleName, model.name);
        })
    }
    catch (err) {
      console.log("err:", err)
    }
    db.sequelize = sequelize;
    return db;
    function addAct(moduleName, controller) {
      th.add({ moduleName: moduleName, controller: controller, action: "add" }, add);
      th.add({ moduleName: moduleName, controller: controller, action: "find" }, find);

    }
    function add(msg, done) {
      if (!msg.controller || !msg.args.data || !msg.tenant)
        return done(new Error('Paramater Error!'));
      
    }
    function find() {
      // await 0;
    }
  },
  loadControllers: function (th, controllerPath, modelPath) {
    fs.readdirSync(controllerPath)
      .filter((file) => {
        return file.indexOf(".") !== 0 && file.split(-3) === ".js";
      })
      .forEach((file) => {
        require(path.join(controllerPath, file))(th)
      })
  }
}