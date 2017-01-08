/*jslint node: true */
"use strict"

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')
const util = require('../util/util')

function signUp(req, res){
    if(!req.body.email && !req.body.password || !req.body.fullname) {res.status(500).send({message: `Debe ingresar fullname, email y password`})}
    const user = new User({
        email: req.body.email,
        fullname: req.body.fullname
    })

    //generar password
    util.getHash(user.password, (encryptedPass) => {

        user.password = encryptedPass
        user.save((err) => {
        if(err) { res.status(500).send({message: `Error al crear al usuario: ${err}`})}

        return res.status(200).send({ token: service.createToken(user)})
    })

    })

}

function signIn(req, res){
    
    if(!req.body.email && !req.body.password) {res.status(500).send({message: `Debe ingresar email y password`})}
    const pEmail = req.body.email.toLowerCase().trim()
    const pPassword = req.body.password
    User.findOne({email: pEmail}, (err, user) => {
        
        if(err) { 
            return res.status(500).send({message: `Error al tratar de validar los datos del usuario: ${err}`})
        }

        if(!user) { 
            return res.status(401).send({message: 'Credenciales incorrectos'})
        }

        //validacion del password
        user.comparePassword(pPassword, (err, isMatch) => {
            
            if(err) { return res.status(500).send({ message: 'Se presento un error al procesar esta accion'})}

            if(isMatch) { return res.status(401).send({ message: 'Sus credenciales son incorrectas'})}

            res.status(200).send({ token: service.createToken(user), message: 'Logoneo  exitoso'})

        })

        res.status(200).send({ token: service.createToken(user), message: 'Logoneo exitoso' })
        
    })
}


module.exports = {
    signIn,
    signUp
}
