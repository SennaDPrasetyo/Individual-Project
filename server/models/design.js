'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Design extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Design.belongsTo(models.Category)
      Design.belongsTo(models.User)
    }
  };
  Design.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    UsersId: DataTypes.INTEGER,
    CategoriesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Design',
  });
  return Design;
};