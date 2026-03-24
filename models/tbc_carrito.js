'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  tbc_carrito.init({
    estado: {
      type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    modelName: 'tbc_carrito',
    tableName: 'tbc_carrito',
    timestamps: true
  });

  // Asociaciones siguiendo tu estructura de tbb_productos
  tbc_carrito.associate = function(models) {
    // Relación: Un carrito pertenece a un usuario
    tbc_carrito.belongsTo(models.tbc_usuarios, {
      as: 'tbc_usuarios',
      foreignKey: 'id_usuario', 
    });

    // Relación: Un carrito tiene muchos detalles (productos en el carrito)
    tbc_carrito.hasMany(models.tbd_carrito_detalle, {
      as: 'tbd_carrito_detalle',
      foreignKey: 'id_carrito',
    });
  };

  return tbc_carrito;
};