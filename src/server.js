const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const exceptionHandler = require('./middlewares/ExceptionHandler');

mongoose.connect('mongodb://localhost:27017/desafiodb', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Mongo connected'));

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