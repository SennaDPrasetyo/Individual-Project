'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Categories', [
     {
       name: 'Living Room',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Bed Room',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Dining Room',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Kitchen Set',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Garage',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Full House',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null)
  }
};
