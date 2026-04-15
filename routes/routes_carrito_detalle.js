const carritoDetalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
    app.get('/api/carrito-detalles', carritoDetalleController.list);
    app.get('/api/carrito-detalle/:id_carrito', carritoDetalleController.find);
    app.post('/api/carrito-detalles', carritoDetalleController.create);
    app.delete('/api/carrito-detalles/:id', carritoDetalleController.delete);
    app.put('/api/carrito-detalles/:id', carritoDetalleController.update);
}
