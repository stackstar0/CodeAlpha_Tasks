const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // pending, completed, cancelled
    },
    items: {
        type: DataTypes.JSON, // Storing items as JSON for simplicity in this MVP
        allowNull: false
    }
});

// Relationships
User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
