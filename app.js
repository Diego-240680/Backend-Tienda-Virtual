const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const http = require('http');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=> res.status(200).send({message: 'bienvenido a mi API de tienda virtual',}));

require('./routes/routes_categorias')(app);
require('./routes/routes_usuarios')(app);
require('./routes/routes_productos')(app);
require('./routes/routes_carrito')(app);
require('./routes/routes_carrito_detalle')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;


