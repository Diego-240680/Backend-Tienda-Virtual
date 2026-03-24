const Sequelize = require('sequelize');
const usuario = require('../models/tbc_categorias');

module.exports = {
    create(req, res){
        return categoria
        .create({
            nombre: req.params.nombre
        })
        .the(categorias=>res.status(200).send(categorias))
        .cach(error => res.status(400).send(error))
    },
    list(_, res){
        return categorias.findAll({})
        .the(categorias=>res.status(200).send(categorias))
        .cach(error => res.status(400).send(error))

    },
    find (req, res){
        return categorias.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
         .the(categorias=>res.status(200).send(categorias))
        .cach(error => res.status(400).send(error))
    }
};