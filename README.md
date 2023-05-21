# Balto-backend - API REST ecommerce app

API Rest developed for CoderHouse Backend Course

## Deploy

Link to live version - [Balto's Shop](https://balto-frontend.vercel.app/)

Link to live server on Railway app - [Server](https://balto-backend.up.railway.app/api/docs)

## Features

<b>Auth Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Login | &#10004; | Login with Local and Jwt Strategy |

<b>User Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Register | &#10004; | Add one User to the Db |
| List one | &#10004; | List one User by Id |
| List all | &#10004; | List all Users |
| Change role | &#10004; | Update User role |
| Upload | &#10004; | Upload one o more documents |
| Restore one | &#10004; | Update User password |
| Delete all | &#10004; | Delete all Users |
| Delete one | &#10004; | Delete one User by Id |

<b>Products Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add one | &#10004; | Add a Product on the Db |
| List all | &#10004; | List all Products |
| List one | &#10004; | List a Product by ID |
| Edit one | &#10004; | Update a Product |
| Delete one | &#10004; | Delete a Product |

<b>Carts Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add ona | &#10004; | Add one Product to the Cart |
| Add array | &#10004; | Add an array of Products to the Cart |
| List all | &#10004; | List all Carts |
| List one | &#10004; | List a Cart by ID |
| Edit Quantity | &#10004; | Update a Product Quantity |
| Delete all | &#10004; | Delete all Products in Cart |
| Delete one | &#10004; | Delete one Product |
| Checkout | &#10004; | Ability to Checkout |

<b>Payment Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Payment | &#10004; | Pay all Products in Cart with Stripe API |

<b>Messages Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Chat | &#10004; | Chat developed with Socket.io |

# Balto-backend

**eCommerce** it's an open source (test scenario) software made to create a easy and simple "Shop" API, where you have different micro services, one the **Products API** that stores and handles everything Related Stock and Products. The **Cart API** where you can create orders (cart's), add, delete and checkout items. The **User API** where you can register new user, login, update documents and restore password.

## Documentation

Full API documentation made with [Swagger](https://swagger.io), you can check it by accessing [this](balto-backend.up.railway.app/api/docs) link.


## Installation

`npm install`

### Development

**If you want BUILD the API**

`npm run build`

**If you want RUN the API**

`node build`

## Running Test Cases

User, Products and Carts API have integration test cases that can be runned.

## Technologies used

**JavaScript** - programming language.

**TypeScript** - a syntactic superset of JavaScript which adds static typing.

**NodeJs** - open-source, cross-platform JavaScript runtime environment and library for running web applications outside the client's browser.

**ExpressJS** - framework that provides broad features for building web and mobile applications.

**MongoDb** - a non-relational document database that provides support for JSON-like storage.

**Socket.io** - an event-driven library for real-time web applications.

**Nodemailer** - Node JS module that allows you to send emails from your server.

**Stripe** - API to accept payments, send payouts, and manage their businesses online.

**Mocha - Chai** - frameworks used together for unit testing.

**Supertest** - frameworks used for integration testing.

**Handlebars** - Javascript library used to create reusable webpage templates. 

**Swagger** - an open source set of rules, specifications and tools for developing and describing RESTful APIs.

**GitHub** - provides hosting for software development version control using Git.

**Git** - version-control system for tracking changes in source code during software development.
