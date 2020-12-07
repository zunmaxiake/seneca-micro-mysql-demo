module.exports = (sequelize, DataTypes) => {
  const cmfClass = sequelize.define("cmf_class", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    tableName: "cmf_class",
    freezeTableName: true
  });
  cmfClass.associate = function (models) {
    models.cmf_class.belongsToMany(models.cmf_poetry, { through: "cmf_class_poetry" });
  }
  return cmfClass;
}