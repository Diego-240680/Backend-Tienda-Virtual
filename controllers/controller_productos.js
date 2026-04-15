const Sequelize = require('sequelize');
const db = require('../models');
const productos = db.tbb_productos;

module.exports = {
    create(req, res){
        return productos
        .create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria
        })
        .then(producto=>res.status(200).send(producto))
        .catch(error => res.status(400).send(error))
    },
    list(_, res){
        return productos.findAll({})
        .then(productosList=>res.status(200).send(productosList))
        .catch(error => res.status(400).send(error))
    },
    find (req, res){
        return productos.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
         .then(productosList=>res.status(200).send(productosList))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return productos.update(
            {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria
            }, 
            {
                where: {
                    id: req.params.id,
                }
            }
        )
         .then(producto=>res.status(200).send(producto))
        .catch(error => res.status(400).send(error))
    },
     delete(req, res){
        return productos.destroy({
            where: {
                id: req.params.id,
            }
        })
         .then(producto=>res.status(200).send(producto))
        .catch(error => res.status(400).send(error))
    },
};
