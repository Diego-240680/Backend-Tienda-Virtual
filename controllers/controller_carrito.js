const Sequelize = require('sequelize');
const db = require('../models');
const carrito = db.tbc_carrito;

module.exports = {
    create(req, res){
        return carrito
        .create({
            estado: req.body.estado || 'pendiente',
            id_usuario: req.body.id_usuario,
            total: req.body.total || 0.00
        })
        .then(carritoItem=>res.status(200).send(carritoItem))
        .catch(error => res.status(400).send(error))
    },
    list(_, res){
        return carrito.findAll({})
        .then(carritoList=>res.status(200).send(carritoList))
        .catch(error => res.status(400).send(error))
    },
    find (req, res){
        return carrito.findAll({
            where: {
                id_usuario: req.params.id_usuario,
            }
        })
         .then(carritoList=>res.status(200).send(carritoList))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return carrito.update(
            {
            estado: req.body.estado,
            total: req.body.total
            }, 
            {
                where: {
                    id: req.params.id,
                }
            }
        )
         .then(carritoItem=>res.status(200).send(carritoItem))
        .catch(error => res.status(400).send(error))
    },
     delete(req, res){
        return carrito.destroy({
            where: {
                id: req.params.id,
            }
        })
         .then(carritoItem=>res.status(200).send(carritoItem))
        .catch(error => res.status(400).send(error))
    },
};
