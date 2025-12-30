# Simple E-commerce Store

A simple, functional e-commerce website built with a Node.js/Express backend and a Vanilla HTML/CSS/JS frontend.

## Features

*   **Product Listing**: Browse available products.
*   **Product Details**: View detailed information about each product.
*   **Shopping Cart**: Add items to a persistent cart (stored in LocalStorage).
*   **User Authentication**: Register and Login functionality using JWT.
*   **Checkout**: Authenticated users can place orders.
*   **Order History**: (Backend API supported) Users can view their past orders.

## Technologies Used

*   **Backend**: Node.js, Express.js, Sequelize (ORM), SQLite (Database).
*   **Frontend**: HTML5, CSS3, Vanilla JavaScript.
*   **Authentication**: JSON Web Tokens (JWT), Bcrypt.

## Setup Instructions

### Prerequisites
*   Node.js (v14 or higher) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/CodeAlpha_Ecommerce.git
    cd CodeAlpha_Ecommerce
    ```

2.  Install Backend Dependencies:
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  Seed the Database (Optional but Recommended):
    This will create the SQLite database file and populate it with sample products.
    ```bash
    node backend/scripts/seed.js
    ```

### Running the Application

1.  Start the Server:
    ```bash
    node backend/server.js
    ```
    The server will start on `http://localhost:3000`.

2.  Open the Website:
    Open your browser and navigate to `http://localhost:3000`.

## JSON Artifacts for Testing

**Test User Credentials:**
*   You will need to register a new user via the "Register" link on the website.

## Project Structure

```
/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers (Auth, Products, Orders)
│   ├── models/         # Sequelize Models (User, Product, Order)
│   ├── routes/         # API Routes
│   ├── scripts/        # Utility scripts (seeding)
│   └── server.js       # Entry point
└── frontend/
    ├── css/            # Styles
    ├── js/             # Application Logic
    ├── *.html          # Web Pages
```
