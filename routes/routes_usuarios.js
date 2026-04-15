const usuarioController = require('../controllers/controller_usuarios');

module.exports = (app) => {
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/usuario/:email', usuarioController.find);
    app.post('/api/usuarios', usuarioController.create);
    app.delete('/api/usuarios/:id', usuarioController.delete);
    app.put('/api/usuarios/:id', usuarioController.update);
}
