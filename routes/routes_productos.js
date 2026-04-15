const productoController = require('../controllers/controller_productos');

module.exports = (app) => {
    app.get('/api/productos', productoController.list);
    app.get('/api/producto/:nombre', productoController.find);
    app.post('/api/productos', productoController.create);
    app.delete('/api/productos/:id', productoController.delete);
    app.put('/api/productos/:id', productoController.update);
}
