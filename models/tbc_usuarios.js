'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_usuarios extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // define association here
    }
  }

  tbc_usuarios.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true // Es recomendable que el email sea único
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente',
    },
    fecha_registro: {
      type: DataTypes.DATE, // Corregido a DATE (mayúsculas)
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'tbc_usuarios',
    tableName: 'tbc_usuarios',
    timestamps: true
  });

  // Asociaciones siguiendo tu estructura de tbb_productos
  tbc_usuarios.associate = function(models) {
    // Relación: Un usuario puede tener muchos carritos
    tbc_usuarios.hasMany(models.tbc_carrito, {
      as: 'tbc_carritos',
      foreignKey: 'id_usuario',
    });
  };

  return tbc_usuarios;
};