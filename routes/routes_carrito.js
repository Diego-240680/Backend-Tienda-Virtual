const carritoController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.get('/api/carritos', carritoController.list);
    app.get('/api/carrito/:id_usuario', carritoController.find);
    app.post('/api/carritos', carritoController.create);
    app.delete('/api/carritos/:id', carritoController.delete);
    app.put('/api/carritos/:id', carritoController.update);
}
