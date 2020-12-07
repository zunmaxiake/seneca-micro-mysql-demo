module.exports = (sequelize, DataTypes) => {
  const cmfAuthor = sequelize.define("cmf_author", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: "cmf_author"
  });
  return cmfAuthor;
}