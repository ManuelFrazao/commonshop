'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: 'categoryId',
                as: 'products'
            });
        }
    }
    Category.init({
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true,
    });
    return Category;
};