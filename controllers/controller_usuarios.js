const Sequelize = require('sequelize');
const db = require('../models');
const usuarios = db.tbc_usuarios;

module.exports = {
    create(req, res){
        return usuarios
        .create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol || 'cliente'
        })
        .then(usuario=>res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },
    list(_, res){
        return usuarios.findAll({})
        .then(usuariosList=>res.status(200).send(usuariosList))
        .catch(error => res.status(400).send(error))
    },
    find (req, res){
        return usuarios.findAll({
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
