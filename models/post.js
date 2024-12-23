'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author'
      })

      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments'
      })

      Post.hasMany(models.Image,{
        foreignKey: 'postId',
        as: 'images'
      })
    }
  }
  Post.init({
    content: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};