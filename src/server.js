require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const exceptionHandler = require('./middlewares/ExceptionHandler');

mongoose.connect(
    `${process.env.MONGO_URL}`,
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    }
);

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.handlers();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    routes() {
        this.express.use(routes);
    }

    handlers() {
        this.express.use(exceptionHandler);
    }
}

module.exports = new App().express;