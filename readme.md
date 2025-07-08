# Project: Bi-Cycle store
# Set: 4
- Live Link: https://bi-cycle-store-server.vercel.app/

## About the project

Bi-Cycle store is a server-side express application for managing bicycle stores, bicycle products, and orders. Core technologies of this project are Express.js, TypeScript, MongoDB with mongoose.

## Features:

- Create bicycle product data in the database.
- Get all the product data at a time and use query parameters for searching products based on product name, type, and brand.
- Get a specific bicycle product data.
- Update single bicycle data.
- Delete bicycle data.
- Order a bicycle.
- Get the sum of revenue of all orders.
- Displays validation, 404, and other errors when incorrect data is entered in the input fields.

## Steps to Run the Project on Your Local Machine

- First, download the zip file or clone this repository on your local machine.
- Unzip or use git clone in the terminal to clone the project.
- Run the command 'npm install' on your vs code terminal after unzipping or cloning.
- After finishing the installation, create a .env file in the root directory.
- In that .env file, add port and MongoDB database link variable using PORT and DATABASE_URL.
- For PORT you can give 4000 or 5000. For DATABASE_URL, you need to give your MongoDB connection link provided by the MongoDB.
- After configuring the .env file, run 'npm run start:dev' in your terminal and that terminal should be open in your project's folder's root.
- Now your application should run on the specified port of the .env file.
