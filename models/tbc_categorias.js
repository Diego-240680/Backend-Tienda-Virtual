'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbc_categorias.init({
    nombre: DataTypes.STRING(100),
    allownull:false
    
  }, {
    sequelize,
    modelName: 'tbc_categorias',
  });

  tbc_categorias.associate = function(models) {
tbc_categorias.hasMany(models.tbb_productos,
    {
      as: 'tbb_productos',
      foreingkey: 'id_categoria',
    }
  );
};

  return tbc_categorias;
};