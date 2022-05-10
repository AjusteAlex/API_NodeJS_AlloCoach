'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Availability.init({
    day: DataTypes.STRING,
    hour: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Availability',
  });
  return Availability;
};