const sequelize = require('../config/database');
const Product = require('../models/Product');
const User = require('../models/User'); // Import merely to ensure table creation if needed

const products = [
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 50
    },
    {
        name: 'Smart Watch',
        description: 'Track your fitness and notifications on the go.',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
        stock: 30
    },
    {
        name: 'Running Shoes',
        description: 'Comfortable shoes for long-distance running.',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
        stock: 100
    },
    {
        name: 'Digital Camera',
        description: 'Capture your moments with stunning clarity.',
        price: 499.99,
        imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 10
    }
];

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: This drops existing tables
        console.log('Database synced.');

        await Product.bulkCreate(products);
        console.log('Products seeded.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
