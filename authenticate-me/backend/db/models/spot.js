'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      // Spot.belongsToMany(models.User,{
      //   through:models.Review,
      //   otherKey:'userId',
      //   foreignKey:'spotId'
      // });

      Spot.hasMany(models.SpotImage, {foreignKey:'spotId',onDelete:"CASCADE", hooks:true});
      Spot.hasMany(models.Review, {foreignKey:'spotId',onDelete:"CASCADE", hooks:true});

      Spot.belongsToMany(models.User,{
        through:models.Booking,
        otherKey:'userId',
        foreignKey:'spotId'
      });

      Spot.belongsTo(models.User,{foreignKey:'ownerId', as: "Owner"});
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull:false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull:false,
    },
    name: {
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
