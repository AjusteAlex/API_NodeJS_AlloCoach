'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [{
        username: "AlexAjuste",
        name: "Alex",
        lastname: "Auste",
        email: "alex@gmail.com",
        phone_number:"0770465957",
        role: "utilisateur",
        bpjeps: false,
        bpjeps_name: "titre bpjeps",
        picture: "pas de photo",
        total_credit : 12,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
  ]);
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};