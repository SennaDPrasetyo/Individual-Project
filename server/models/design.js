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
      Design.belongsTo(models.User, { foreignKey: "UsersId" })
      Design.belongsToMany(models.User, { through: "Bookmark", foreignKey: "DesignId" })
      Design.belongsTo(models.Category, { foreignKey: "CategoriesId" })
    }
  };
  Design.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is a required field'
        },
        notNull: {
          args: true,
          msg: 'Name is a required field'
        }
      }  
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is a required field'
        },
        notNull: {
          args: true,
          msg: 'Description is a required field'
        }
      }  
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image is a required field'
        },
        notNull: {
          args: true,
          msg: 'Image is a required field'
        }
      }  
    },
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