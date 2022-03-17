'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.hasMany(models.Song, { foreignKey: 'CategoryId' });
      models.Category.belongsTo(models.School, { foreignKey: 'SchoolId' });
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Category must not be empty'
        }
      }
    },
    SchoolId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'category',
  });
  return Category;
};