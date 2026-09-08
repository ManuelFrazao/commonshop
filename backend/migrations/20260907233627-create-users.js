'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imgId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'images',
          },
          key: 'imgId',
        },
        allowNull: true,
        onDelete: 'restrict',
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'addresses',
          },
          key: 'addressId',
        },
        allowNull: true,
        onDelete: 'restrict',
      },
      role: {
        type: Sequelize.ENUM('customer', 'staff', 'admin'),
        defaultValue: 'customer',
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      NIF: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('users');
  }
};
