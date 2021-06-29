'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Design, { foreignKey: "UsersId" })
      User.belongsToMany(models.Design, { through: "Bookmark", foreignKey: "UsersId" })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is a required field'
        },
        notNull: {
          args: true,
          msg: 'Username is a required field'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exist!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please input the correct email format!'
        },
        notEmpty: {
          args: true,
          msg: 'Email is a required field'
        },
        notNull: {
          args: true,
          msg: 'Email is a required field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'Password length min. 5'
        },
        notEmpty: {
          args: true,
          msg: 'Password is a required field'
        },
        notNull: {
          args: true,
          msg: 'Password is a required field'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number is a required field'
        },
        notNull: {
          args: true,
          msg: 'Phone number is a required field'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address is a required field'
        },
        notNull: {
          args: true,
          msg: 'Address is a required field'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};