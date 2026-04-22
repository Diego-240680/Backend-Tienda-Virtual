'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tbb_productos', 'imagen', {
      type: Sequelize.STRING(500),
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('tbb_productos', 'imagen');
  }
};
