# Inventrix

The aim of this project was to build an inventory managemnet system for small businesses.

---

## Contributors

- Abdul-Mumin Awinaba: [X](https://x.com/awinaba37449)/[Github](https://github.com/awinabaab?tab=repositories)/[LinkedIn](https://www.linkedin.com/in/abdul-mumin-awinaba-664683311/)
- Emmanuel Tettey: [X](https://x.com/Emmlkt)/[Github](https://github.com/anuelt2?tab=repositories)/[Linkedin](https://www.linkedin.com/in/emmanuel-tettey-bb656628/)
- Johnkennedy Umeh: [X](https://x.com/JKenzzy)/[Github](https://github.com/Johnkenzzy?tab=repositories)/[LinkedIn](https://www.linkedin.com/in/johnkennedy-umeh-979124270/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation

### Prerequisites

- Python (>=3.8)
- MySQL Server (>= 8.x)
- Yarn

#### Installing Python

```bash
sudo apt update
sudo apt install python3
```

#### Installing MySQL Server

```bash
sudo apt update
sudo apt install mysql-server
```

#### Installing yarn using npm

```bash
sudo apt update
sudo apt install nodejs npm
npm install -g yarn
```

### Steps

1. Clone repository:

    ```bash
    git clone https://github.com/anuelt2/inventrix.git
    ```

2. Change the current working directory to the cloned repo:

    ```bash
    cd inventrix/
    ```

3. Create and activate a virtual environment (optional but recommended):

    ```bash
    python3 -m venv .env
    source .env/bin/activate
    ```

4. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Create MySQL user and database:

    ```bash
    cat scripts/db_scripts/setup_inventrix_dev.sql | sudo mysql -u root -p
    ```

6. Dump mock data into database:

    ```bash
    cat scripts/db_scripts/mock_data.sql
    ```

7. Run the flask app:

    ```bash
    python3 -m api.v1.app
    ```

8. Start the react app:

```bash
cd frontend/
npm install -g vite

#Install dependencies
yarn install

#Run the server
vite
```

The react app should be served on `http://localhost:5173/` by default

## Usage

You can choose to either interact with the API directory by sending requests with curl or Postman of your preferred API testing tool

### Using the API

The base route for the endpoints is `/api/v1/{resource}`

All the endpoints are protected except `/api/v1/register` and `/api/v1/register`

To access the remaining resources:

- Create a user by sending POST `/api/v1/register` endpoint. The request body must contain: `first_name`, `last_name`, `username`, `email` and `password`

    ```bash
    # Example using curl
    curl -X POST http://127.0.0.1:5000/api/v1/register \
    -H "Content-Type: application/json" \
    -d '{
            "first_name": "John",
            "last_name": "Doe",
            "username": "jdoe",
            "email": "johndoe@email.com",
            "password": "johndoe"
        }'
    ```

- Login by sending a POST to `/api/v1/login` endpoint. The request body must contain `name` and `password`. The response will contain a JSON Web Token(JWT) you can use for authorisation to access protected resources.

    ```bash
    curl -X POST http://127.0.0.1/api/v1/register \
    -H "Content-Type: application/json" \
    -d '{
            "email": "johndoe@email.com",
            "password": "johndoe"
        }'
    ```

#### Resources and their endpoints

- Categories
    Attributes include
    1. GET `/api/v1/categories`: Returns a list of all categories.
    2. GET `/api/v1/categories/<category_id>`: Returns a category linked to `category_id`.
    3. POST `/api/v1/categories/`: Creates a new category. The request body must contain at least the name of the category e.g. `{"name": "category_name"}`.

        ```bash
        # Example using curl
        curl -X POST http://127.0.0.1/api/v1/categories \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer your_token" \
        -d '{
                "name": "Self-help Books",
                "description": "Self-help books"
            }'
        ```

    4. PUT `/api/v1/categories/<category_id>`: Updates a category linked to `category_id`
    5. DELETE `/api/v1/categories/<category_id>`: Deletes a category linked to `category_id`
    6. PUT `/api/categories/<category_id>/products`: Returns a list of all products linked to `category_id`
    7. PUT `/api/categories/<category_id>/products/<product_id>`: Links a product to a category

- Products
    1. GET `/api/v1/products`: Returns a list of all Products
    2. GET `/api/v1/products/<product_id>`: Returns a product linked to `product_id`.
    3. POST `/api/v1/products/`: Creates a new product. The request body should contain: `name` (string, required),  `brand` (string), `model` (string), `description` (string), `sku` (string, required), `price` (integer, required), `stock_quantity` (integer, required), `reorder_level` (integer, required)

        ```bash
        # Example using curl
        curl -X POST http://127.0.0.1/api/v1/products \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer your_token" \
        -d '{
                "name": "OMO",
                "brand": "OMO",
                "model": "1KG",
                "description": "Detergent",
                "sku": "KJFAUHALIJS",
                "price": 15.99,
                "stock_quantity": 1000,
                "reorder_level": 100
            }'
        ```

    4. PUT `/api/v1/products/<product_id>`: Updates a product linked to `product_id`
    5. DELETE `/api/v1/products/<product_id>`: Deletes a product linked to `product_id`
    6.#TODO: Confirm if there is an endpoint to retrieve all suppliers for a product

- Customers
    1. GET `/api/v1/customers`: Returns a list of all Customers.
    2. GET `/api/v1/customers/<customer_id>`: Returns a customer linked to `customer_id`.
    3. POST `/api/v1/customers/`: Creates a new customer. The request body accepts `name` (string), `phone` (string), `email` (string) and `address` (string).

        ```bash
        # Example using curl
        curl -X POST http://127.0.0.1/api/v1/products \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer your_token" \
        -d '{
                "name": "John",
                "phone": "+233 12 345 6789",
                "email": "john@mail.com",
                "address": "123 C-Sharp street"
            }'
        ```

    4. PUT `/api/v1/customers/<customer_id>`: Updates a customer linked to `customer_id`
    5. DELETE `/api/v1/customers/<customer_id>`: Deletes a customer linked to `customer_id`

- Suppliers
    1. GET `/api/v1/suppliers`: Returns a list of all Suppliers.
    2. GET `/api/v1/suppliers/<supplier_id>`: Returns a supplier linked to `supplier_id`.
    3. GET `/api/v1/suppliers/<supplier_id>/products`: Returns a list of products of supplier linked to `supplier_id`.
    4. POST `/api/v1/suppliers/`: Creates a new supplier. The request body accepts `name` (required), `contact_person` (requried), `phone` (required), `email` (required) and `address`.

        ```bash
        # Example using curl
        curl -X POST http://127.0.0.1/api/v1/suppliers \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer your_token" \
        -d '{
                "name": "Quick Supplies",
                "contact_person": "Juliet"
                "phone": "+233 12 345 6789",
                "email": "juliet@mail.com",
                "address": "123 C-Sharp street"
            }'
        ```

    5. PUT `/api/v1/suppliers/<supplier_id>`: Updates a supplier linked to `supplier_id`
    6. DELETE `/api/v1/suppliers/<supplier_id>`: Deletes a supplier linked to `supplier_id`

- Transactions
    1. GET `/api/v1/transactions`: Returns a list of all Transactions.
    2. GET `/api/v1/transactions/<transaction_id>`: Returns a transaction linked to `transaction_id`.
    3. POST `/api/v1/transactions/`: Creates a new transaction. The request body accepts `transaction_type` (string, required), `user_id` (string, required), `supplier_id` (string, required for `purchase` transaction_type), `customer_id` (string, required for `sale` transaction_type) and list of transaction_items (list of objects, required). Each transaction_item accepts `quantity` (integer, required), `unit_price` (integer, required), `total` (integer, required), `product_id` (string, required).

        ```bash
        # Example using curl with sale transaction
        curl -X POST http://127.0.0.1/api/v1/transactions \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer your_token" \
        -d '{
                "transaction_type": "sale",
                "user_id": "1234567890",
                "customer_id": "1234567890",
                "transaction_items": [
                    {"quantity": 3, "unit_price": 2, "total": 6, "product_id": "1234567890"}
                ]
            }'
        ```

    4. PUT `/api/v1/transactions/<transaction_id>`: Updates a transaction linked to `transaction_id`
    5. DELETE `/api/v1/transactions/<transaction_id>`: Deletes a transaction linked to `transaction_id`

### Using the React app

1. Open the browser and go to `http://127.0.0.1:5000`

2. The app will display the homepage

3. Create a new user if you haven't already.

4. Login with your user's credentials.

## Features

- User authentication
- CRUD operations
- RESTful API for managing resources
- Pagination

## Configuration

## Contributing

## License

## Acknowledgments
