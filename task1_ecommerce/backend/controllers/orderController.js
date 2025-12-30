const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, items } = req.body;

        // In a real app, verify stock and prices here
        const newOrder = await Order.create({
            UserId: userId,
            totalAmount,
            items,
            status: 'completed' // Simplify to completed for now
        });

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({ where: { UserId: userId } });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
