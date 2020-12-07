const fs = require("fs");
const path = require("path");

module.exports = {
  loadModels: function (th, moduleName, modelPath, config) {
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(config.url, config.defult);
    const db = {};
    try {
      fs.readdirSync(modelPath)
        .filter(file => {
          return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
        })
        .forEach(file => {
          const model = sequelize['import'](path.join(modelPath, file));
          addAct(moduleName, model.name);
          db[model.name] = model;
        })
    }
    catch (err) { console.log("plugin err:", err) };
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    })
    db.sequelize = sequelize;
    return db;
    function addAct(moduleName, controller) {
      th.add({ moduleName: moduleName, controller: controller, action: "add" }, add);
      th.add({ moduleName: moduleName, controller: controller, action: "find" }, find);
    }
    function add(msg, done) {
      if (!msg.controller || !msg.args.data)
        done(new Error("Paramater Error!"));
      if (Array.isArray(msg.args.data)) {
        sequelize.model(msg.controller)
          .bulkCreate(msg.args.data)
          .then(result => {
            done(null, result);
          })
          .catch(err => {
            done(err);
          });
      }
      else {
        let include = [];
        if (Array.isArray(msg.args.include)) {
          msg.args.include.forEach(ele => {
            let includeO = {};
            includeO.model = sequelize.model(ele.model);
            includeO.as = ele.as;
            include.push(includeO);
          })
        }
        try {
          sequelize.model(msg.controller)
            .create(msg.args.data, { include: include })
            .then(result => {
              if (msg.args.associate) {
                //不理解，待探索
                doAssociate(msg.args.associate, {
                  model: msg.controller,
                  id: result.id
                })
              }
              done(null, result);
            })
            .catch(err => {
              done(err);
            });
        }
        catch (err) {
          console.log("err:", err)
        }
      }
    }
    function find(msg, done) {
      if (!msg.controller)
        done(new Error("Paramater Error!"));
      // 模糊查询可参考中微项目
      // if (msg.args.where)
      //   msg.args.where.tenant = msg.tenant
      // else {
      //   msg.args.where = { tenant: msg.tenant }
      // }
      let limit, offset;
      if (!msg.args.pages) {
        limit = 10000;
        offset = 0;
      }
      else {
        limit = msg.args.pages.pageSize;
        offset = (msg.args.pages.page - 1) * limit;
      }
      if (Array.isArray(msg.args.include)) {
        msg.args.include.forEach(function (ele) {
          if (ele.model)
            ele.model = sequelize.model(ele.model);
        })
      }
      let distinct;
      if (msg.args.include) {
        distinct = true;
      } else {
        distinct = false;
      }
      sequelize.model(msg.controller)
        .findAndCountAll({
          attributes: msg.args.fields,
          where: msg.args.where,
          include: msg.args.include,
          order: msg.args.order,
          offset: offset,
          limit: limit,
          distinct: distinct
        })
        .then(result => {
          done(null, result);
        })
        .catch(err => {
          done(err);
        })
    }
    function doAssociate(Source, Target) {
      sequelize.model(Source.model).findAll({ where: { id: Source.id } })
        .then(function (source) {
          sequelize.model(Target.model)
            .findByPk(Target.id)
            .then(function (target) {
              var m = 'set' + Source.model + 's';
              if (!target[m])
                return new Error('Error');
              target[m](source).then(() => {
                return (null, { res: 'ok' });
              })
            })
            .catch(function (err) {
              console.log(err.message, 'upAssociate');
              return (err)
            })

        }).catch(function (err) {
          console.log(err.message, 'find');
          return err
          //done(err)
        })
    }
  },
  loadControllers: function (th, moduleName, controllerPath, models) {
    fs.readdirSync(controllerPath)
      .filter(file => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
      })
      .forEach(file => {

      })
  }
}