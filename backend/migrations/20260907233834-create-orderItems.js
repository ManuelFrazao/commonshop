'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      transDetailId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'transactions',
          },
          key: 'transId',
        },
        allowNull: false,
        onDelete: 'cascade',
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
        onDelete: 'restrict',
      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.DECIMAL({ precision: 10, scale: 2 }),
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};
