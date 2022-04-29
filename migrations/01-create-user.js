'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique: true,
        allowNull: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        is: /^[\w\.\-\_]+@([\w\.\-+]+\.[\w\.\-+]+)$/i,
        unique: true,
        allowNull: true,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code_auth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      auth_token: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING
      },
      bpjeps: {
        type: Sequelize.BOOLEAN
      },
      bpjeps_name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      total_credit: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};