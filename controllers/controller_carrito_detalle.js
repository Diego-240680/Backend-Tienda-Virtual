const Sequelize = require('sequelize');
const db = require('../models');
const carritoDetalle = db.tbd_carrito_detalle;

module.exports = {
    create(req, res){
        return carritoDetalle
        .create({
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto,
            cantidad: req.body.cantidad,
            precio_unitario: req.body.precio_unitario
        })
        .then(detalle=>res.status(200).send(detalle))
        .catch(error => res.status(400).send(error))
    },
    list(_, res){
        return carritoDetalle.findAll({})
        .then(detalleList=>res.status(200).send(detalleList))
        .catch(error => res.status(400).send(error))
    },
    find (req, res){
        return carritoDetalle.findAll({
            where: {
                id_carrito: req.params.id_carrito,
            }
        })
         .then(detalleList=>res.status(200).send(detalleList))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return carritoDetalle.update(
            {
            cantidad: req.body.cantidad,
            precio_unitario: req.body.precio_unitario
            }, 
            {
                where: {
                    id: req.params.id,
                }
            }
        )
         .then(detalle=>res.status(200).send(detalle))
        .catch(error => res.status(400).send(error))
    },
     delete(req, res){
        return carritoDetalle.destroy({
            where: {
                id: req.params.id,
            }
        })
         .then(detalle=>res.status(200).send(detalle))
        .catch(error => res.status(400).send(error))
    },
};
