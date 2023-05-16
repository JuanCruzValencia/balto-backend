# Balto-backend - API REST ecommerce app

Link to live version - [Balto's Shop]()
Link to live server on Railway app - [Server](balto-backend.up.railway.app/api/docs)

API Rest developed for CoderHouse Backend Course

Link to Swagger docs - [Documentation](balto-backend.up.railway.app/api/docs)

![](http://imgur.com/t3teAxi.png)
### :handbag: A simple RESTful API for Purchases and Products

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Github All Releases](https://img.shields.io/github/downloads/ovflowd/ecommerce/total.svg)]() [![GitHub release](https://img.shields.io/github/release/ovflowd/ecommerce.svg)]() [![Build Status](https://travis-ci.org/ovflowd/ecommerce.svg?branch=master)](https://travis-ci.org/ovflowd/ecommerce) [![Codecov](https://img.shields.io/codecov/c/github/ovflowd/ecommerce.svg)]() [![Docker Pulls](https://img.shields.io/docker/pulls/sant0ro/products-api.svg)]() [![Docker Pulls](https://img.shields.io/docker/pulls/sant0ro/purchase-api.svg)]()

## Deploy

<a href="https://azuredeploy.net/"><img src="http://azuredeploy.net/deploybutton.png" height="32"></a> <a href="https://bluemix.net/deploy?repository=https://github.com/sant0ro/eCommerce"><img src="https://bluemix.net/deploy/button.png" height="32"></a>

## Features

<b>Products Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Product | &#10004; | Ability of Add a Product on the System |
| List Products | &#10004; | Ability of List Products |
| Edit a Product | &#10004; | Ability of Edit a Product |
| Delete a Product | &#10004; | Ability of Delete a Product |
| Stock | &#10004; | Ability of Update the Stock |
| Stock History | &#10004; | Ability to see the Stock History |

<b>Purchase Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create a Cart | &#10004; | Ability of Create a new Cart |
| See Cart | &#10004; | Ability to see the Cart and it items |
| Remove a Cart | &#10004; | Ability of Remove a Cart |
| Add Item | &#10004; | Ability of add a new Item on the Cart |
| Remove a Item | &#10004; | Ability of Remove a Item from the Cart |
| Checkout | &#10004; | Ability to Checkout |

# eCommerce

**eCommerce** it's an open source (test scenario) software made to create a easy and simple "Shop" API, where you have two micro services, one the **Products API** that stores and handles everything Related to Stock and Products. And the **Purchase API** where you can create orders (cart's) and checkout items.

The purpose of this repository it's for education and test. But the code it's being coded in a proper way.

## Documentation

**eCommerce** has a full API documentation made with [Swagger](https://swagger.io), you can check it by accessing [this](http://santoro.pw/eCommerce) link.


## Installation

`npm install`

### Development

**If you want BUILD the API**

`npm run build`

**If you want RUN the API**

`node build`

### Notes

**Note.:** By default `balto-backend` runs on port 8080.

**Note.:** You also can clean the sources and rebuild the sources by running `grailsw clean`

## Running Test Cases

Yoou can run test cases in PRODUCTS, CARTS, USERS folder

## Technologies used

**JavaScript** - programming language.

**TypeScript** - a syntactic superset of JavaScript which adds static typing.

**NodeJs** - open-source, cross-platform JavaScript runtime environment and library for running web applications outside the client's browser.

**ExpressJS** - framework that provides broad features for building web and mobile applications.

**MongoDb** - a non-relational document database that provides support for JSON-like storage.

**Socket.io** - an event-driven library for real-time web applications.

**Nodemailer** - Node JS module that allows you to send emails from your server.

**Stripe** - API to accept payments, send payouts, and manage their businesses online.

**Handlebars** - Javascript library used to create reusable webpage templates. 

**Swagger** - an open source set of rules, specifications and tools for developing and describing RESTful APIs.

**GitHub** - provides hosting for software development version control using Git.

**Git** - version-control system for tracking changes in source code during software development.
