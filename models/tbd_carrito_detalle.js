'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbd_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  tbd_carrito_detalle.init({
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbd_carrito_detalle',
    tableName: 'tbd_carrito_detalle',
    timestamps: true
  });

  // Asociaciones siguiendo tu estilo de tbb_productos
  tbd_carrito_detalle.associate = function(models) {
    tbd_carrito_detalle.belongsTo(models.tbc_carrito, {
      as: 'tbc_carrito',
      foreignKey: 'id_carrito', // Corregido: 'g' antes de 'n'
    });

    tbd_carrito_detalle.belongsTo(models.tbb_productos, {
      as: 'tbb_productos',
      foreignKey: 'id_producto',
    });
  };

  return tbd_carrito_detalle;
};