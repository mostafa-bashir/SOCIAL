'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'authorId',
        as: 'posts'
      })

      User.hasMany(models.Comment,{
        foreignKey: 'authorId',
        as: 'comments'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ppUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '/https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg'
    }, 
   }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};