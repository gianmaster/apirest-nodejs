/*jslint node: true */
"use strict"

const express = require('express')
const route = express.Router()
const authMiddleware = require('./middlewares/authenticated')

/*************CONTROLLERS*****************/
const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController')

route.get('/user', UserController.getUsers)
route.post('/user', UserController.createUser)
route.get('/user/:userId', UserController.getUserById)
route.put('/user/:userId', UserController.updateUser)
route.delete('/user/:userId', UserController.deleteUser)

route.get('/private', authMiddleware, function(req,res){
    res.status(200).send({message: 'Tienes acceso con token valido'})
})

//Auth
route.post('/login', AuthController.signIn)
route.post('/register', AuthController.signUp)

module.exports = route
