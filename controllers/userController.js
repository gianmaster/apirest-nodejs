/*jslint node: true */
"use strict"

const User = require('../models/user')

//methods for my controller
function getUsers(req, res){
    User.find({}, (err, usuarios) => {
        
        if(err) {return res.status(500).send({message: `Error al consultar los datos: ${err}`})}

        if(!usuarios) { return res.status(404).send({message: 'No se encontraron registros'})}

        res.status(200).send({data: usuarios})

    });
}

function getUserById(req, res){
    User.findById(req.params.user , (err, usuario) => {

        if (err) {return res.status(500).send({message: `Error en la peticion: ${err}`})}

        if (!usuario) {return res.status(404).send({message: 'Usuario no existe'})}

        res.status(200).send({usuario})
    });
}

function createUser(req, res){
    let usuario = new User()
    let d = req.body
    usuario.email = d.email
    usuario.fullname = d.fullname
    usuario.birth = d.birth
    usuario.lastLogin = null

    usuario.save((err, usuarioStored) => {

        if(err) { res.status(500).send({message: `Error al registrar el usuario: ${err}`}) }

        res.status(201).send({message: 'Usuario registrado correctamente', usuario: usuarioStored})
    })
}

function updateUser(req, res){
    console.log(`PUT /api/usuario/${req.params.userId}`);

    User.findByIdAndUpdate(req.params.userId, req.body, (err, usuario) => {

        if(err) { res.status(500).send({message: `Error al tratar de actualizar el registro: ${err}`})}

        res.status(200).send({message: 'Se actualizó el registro correctamente'})
    });
}


function deleteUser(req, res){
    console.log(`DELETE /api/usuario/${req.params.userId}`);

    User.findById(req.params.userId, (err, usuario) => {
        
        if(err) { res.status(500).send({message: `Error al tratar de eliminar el registro: ${err}`})}

        usuario.remove((err) => {
            if(err) { res.status(500).send({message: `Error al tratar de eliminar el registro de la base de datos: ${err}`})}

            res.status(200).send({message: 'Se eliminó el registro correctamente'})
        });
    });
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
