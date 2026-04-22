const usuarioController = require('../controllers/controller_usuarios');
const validateCreateUsuario = require('../middleware/validate_create_usuario');

module.exports = (app) => {
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/usuario/:email', usuarioController.find);
    app.post('/api/usuarios', validateCreateUsuario, usuarioController.create);
    app.post('/api/usuarios/login', usuarioController.login);
    app.post('/api/login', usuarioController.login);
    app.delete('/api/usuarios/:id', usuarioController.delete);
    app.put('/api/usuarios/:id', usuarioController.update);
}
