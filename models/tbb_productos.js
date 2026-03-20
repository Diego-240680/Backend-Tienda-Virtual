'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Ejemplo: this.belongsTo(models.tbc_categorias, { foreignKey: 'id_categoria' });
    }
  }

  tbb_productos.init({
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT, 
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    id_categoria: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
    tableName: 'tbb_productos', 
    timestamps: true 
  }
);

tbb_productos.associate = function(models) {
tbb_productos.belongsTo(models.tbc_categorias,
    {
      as: 'tbc_categorias',
      foreingkey: 'id_categoria',
    }
  );
};

  return tbb_productos;
};