/*jslint node: true */
"use strict"

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')
const bcrypt = require('bcrypt-nodejs')

function signUp(req, res){
    const user = new User({
        email: req.body.email,
        fullname: req.body.fullname,
        birth: req.body.birth
    });

    user.save((err) => {
        if(err) { res.status(500).send({message: `Error al crear al usuario: ${err}`})}

        return res.status(200).send({ token: service.createToken(user)})
    })
}

function signIn(req, res){
    const pEmail = req.body.email.toLowercase().trim()
    const pPassword = req.body.password
    User.findOne({email: pEmail}, (err, user) => {
        if(err) { res.status(500).send({message: `Error al tratar de validar los datos del usuario: ${err}`})}

        if(!user) { res.status(404).send({message: 'Credenciales incorrectos'})}

        bcrypt.genSalt(10, (err, salt) => {
            if(err) { res.status(500).send({message: `Se presento un error al tratar de validar sus credenciales de acceso: ${err}`})}

            bcrypt.hash(pPassword, salt, null, (err, hash) => {
                if(err) { res.status(500).send({message: `Se presento un error al tratar de validar sus credenciales de acceso: ${err}`})}

                if(user.password !== hash){ res.status(500).send({message: 'Credenciales incorrectos'})}

                return res.status(200).send({ token: service.createToken(user)})
            
            })
        })
    })
}


module.exports = {
    signIn,
    signUp
}
