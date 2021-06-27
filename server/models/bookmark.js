'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Design, { foreignKey: "DesignId" })
      Bookmark.belongsTo(models.User, { foreignKey: "UsersId"})
    }
  };
  Bookmark.init({
    UsersId: DataTypes.INTEGER,
    DesignId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};