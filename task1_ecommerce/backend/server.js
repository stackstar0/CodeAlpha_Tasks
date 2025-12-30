const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, '../frontend')));

// Test DB Connection and Sync
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Sync models
sequelize.sync()
    .then(() => console.log('Database synced...'))
    .catch(err => console.log('Error syncing database: ' + err));

// Basic Route for Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
