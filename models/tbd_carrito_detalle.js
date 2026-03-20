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
      // this.belongsTo(models.tbc_carrito, { foreignKey: 'id_carrito' });
      // this.belongsTo(models.tbb_productos, { foreignKey: 'id_producto' });
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
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1 // Evita que se agreguen 0 o cantidades negativas
      }
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

  return tbd_carrito_detalle;
};