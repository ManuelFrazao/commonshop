'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_dump', {
      imgDumpId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prodId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'prodId',
        },
        allowNull: false,
        onDelete: 'cascade',
      },
      imgId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'images',
          },
          key: 'imgId',
        },
        allowNull: false,
        onDelete: 'cascade',
      },
      mainImage: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('image_dump', ['prodId', 'imgId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('image_dump');
  }
};
