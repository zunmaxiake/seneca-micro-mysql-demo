module.exports = (sequelize, DataTypes) => {
  const cmfPoetry = sequelize.define("cmf_poetry", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    authorId: { type: DataTypes.INTEGER },
    // classId: { type: DataTypes.INTEGER },
  }, {
    freezeTableName: true,
    tableName: "cmf_poetry"
  });
  /**
   * debug:
   * 1、belongsTo多对一,用主的外键关联子的主键，子的那边不用做任何关联设置
   * 2、这里的as别名必须和创建和查询中使用的include中的as别名一致
   * 参考学习：https://itbilu.com/nodejs/npm/41qaV3czb.html
  */
  cmfPoetry.associate = function (models) {
    models.cmf_poetry.belongsTo(models.cmf_author, { as: "author", foreignKey: "authorId", targetKey: "id" });
    // models.cmf_poetry.belongsToMany(models.cmf_class, { through: "cmf_class_poetry" });
    models.cmf_poetry.belongsToMany(models.cmf_class, { as: "class_poetry", through: "cmf_class_poetry", foreignKey: id, otherKey: cmfPoetryId });
  };
  return cmfPoetry;
}