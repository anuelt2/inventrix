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

#### Resources and their endpoints

- Categories
    1. GET `/api/v1/categories`: Returns a list of all categories.
    2. GET `/api/v1/categories/<category_id>`: Returns a category linked to `category_id`.
    3. POST `/api/v1/categories/`: Creates a new category. The request body must contain at least the name of the category e.g. `{"name": "category_name"}`
    4. PUT `/api/v1/categories/<category_id>`: Updates a category linked to `category_id`
    5. DELETE `/api/v1/categories/<category_id>`: Deletes a category linked to `category_id`
    6. PUT `/api/categories/<category_id>/products`: Returns a list of all products linked to `category_id`
    7. PUT `/api/categories/<category_id>/products/<product_id>`: Links a product to a category

### Using `curl`

```bash
curl -X GET http://127.0.0.1/api/v1/categories
```

### Using the React app

1. Open the browser and go to `http://127.0.0.1:5000`

2. The app will display the homepage

## Features

- User authentication
- CRUD operations
- RESTful API for managing resources
- Pagination

## Configuration

## Contributing

## License

## Acknowledgments
