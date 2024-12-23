'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Posts', 'picUrl');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */  
      await queryInterface.addColumn('Posts', 'picUrl', {
      type: Sequelize.DataTypes.STRING, // Replace with the appropriate column type
      allowNull: false // Adjust this as per your column definition
    });
  }
};
