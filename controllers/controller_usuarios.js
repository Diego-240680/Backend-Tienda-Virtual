const db = require('../models');
const bcrypt = require('bcrypt');
const usuarios = db.tbc_usuarios;

module.exports = {
    async create(req, res){
        try {
            const existingUser = await usuarios.findOne({
                where: { email: req.body.email }
            });

            if (existingUser) {
                return res.status(409).json({
                    ok: false,
                    message: 'El email ya esta registrado',
                    errors: [{ field: 'email', message: 'email duplicado' }]
                });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const usuario = await usuarios.create({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: hashedPassword,
                rol: req.body.rol || 'cliente'
            });

            const usuarioResponse = usuario.toJSON();
            delete usuarioResponse.password;

            return res.status(201).json({
                ok: true,
                message: 'Usuario creado correctamente',
                data: usuarioResponse
            });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    ok: false,
                    message: 'El email ya esta registrado',
                    errors: [{ field: 'email', message: 'email duplicado' }]
                });
            }

            return res.status(500).json({
                ok: false,
                message: 'Error interno al crear usuario',
                errors: [{ message: error.message }]
            });
        }
    },
    async login(req, res) {
        try {
            const email = (req.body.email || '').trim().toLowerCase();
            const password = req.body.password || '';

            if (!email || !password) {
                const errors = [];
                if (!email) errors.push({ field: 'email', message: 'email es requerido' });
                if (!password) errors.push({ field: 'password', message: 'password es requerido' });

                return res.status(400).json({
                    ok: false,
                    message: 'Email y password son requeridos',
                    errors
                });
            }

            const usuario = await usuarios.findOne({ where: { email } });

            if (!usuario) {
                return res.status(401).json({
                    ok: false,
                    message: 'Usuario o contrasena incorrectos',
                    errors: [{ message: 'Credenciales invalidas' }]
                });
            }

            const isValidPassword = await bcrypt.compare(password, usuario.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    ok: false,
                    message: 'Usuario o contrasena incorrectos',
                    errors: [{ message: 'Credenciales invalidas' }]
                });
            }

            const usuarioResponse = usuario.toJSON();
            delete usuarioResponse.password;

            return res.status(200).json({
                ok: true,
                message: 'Login exitoso',
                data: usuarioResponse
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error interno en login',
                errors: [{ message: error.message }]
            });
        }
    },
    list(_, res){
        return usuarios.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(usuariosList=>res.status(200).send(usuariosList))
        .catch(error => res.status(400).send(error))
    },
    find (req, res){
        return usuarios.findAll({
            attributes: { exclude: ['password'] },
            where: {
                email: req.params.email,
            }
        })
         .then(usuariosList=>res.status(200).send(usuariosList))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return usuarios.update(
            {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            rol: req.body.rol
            }, 
            {
                where: {
                    id: req.params.id,
                }
            }
        )
         .then(usuario=>res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },
     delete(req, res){
        return usuarios.destroy({
            where: {
                id: req.params.id,
            }
        })
         .then(usuario=>res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },
};
