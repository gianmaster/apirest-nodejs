/*jslint node:true */
"use strict"

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../../config/index')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes cabecera de autorizacion'})
    }

    const myToken = req.headers.authorization.split(' ')[1]
    let payload = null
    if(myToken.split('.').length !== 3){
        return res.status(403).send({message: 'Token de acceso mal formado '})
    }
    
    try{
        payload = jwt.decode(myToken, config.SECRET_TOKEN, false)
    }catch(err){
        return res.status(403).send({message: 'Token no valido'})
    }

    //verificacion de token valido
    if(payload.exp <= moment().unix()) { 
        return res.status(401).send({ message: 'El token ha expirado'})
    }

    req.user = payload.sub
    next()
}

module.exports = isAuth

