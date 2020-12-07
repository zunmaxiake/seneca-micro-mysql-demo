module.exports = (sequelize, DataTypes) => {
  const cmfClassPoetry = sequelize.define("cmf_class_poetry", {
    cmfClassId: { type: DataTypes.INTEGER },
    cmfPoetryId: { type: DataTypes.INTEGER },
  }, {
    freezeTableName: true,
    tableName: "cmf_class_poetry"
  });
  return cmfClassPoetry;
}