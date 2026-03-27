const categoriaController = require('../controllers/controller_categoria');

module.exports = (app) => {
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categoria/:nombre', categoriaController.find);
    app.post('/api/categorias', categoriaController.create);
    app.delete('/api/categorias7:id', categoriaController.delete);
    app.put('/api/categorias/:id', categoriaController.update);
}