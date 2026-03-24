'use strict';

const { Model } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbb_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(150),
        allowNull: false // Obligatorio
      },
      descripcion: {
        type: Sequelize.TEXT, // Cambiado a TEXT para descripciones largas
        allowNull: true
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2), // Correcto para dinero
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER, // Números enteros para inventario
        allowNull: false,
        defaultValue: 0
      },
      id_categoria: {
        type: Sequelize.INTEGER, // Relación numérica
        allowNull: false,
        references: {
          model: 'tbc_categorias',
          key: 'id'
        },

        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now') // Valor por defecto al crear
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbb_productos');
  }
};