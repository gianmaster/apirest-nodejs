/*jslint node: true */
"use strict"

const express = require('express')
const route = express.Router()

/*************CONTROLLERS*****************/

//User controller
const UserCtrl = require('../controllers/userController')

route.get('/user', UserCtrl.getUsers)
route.post('/user', UserCtrl.createUser)
route.get('/user/:userId', UserCtrl.getUserById)
route.put('/user/:userId', UserCtrl.updateUser)
route.delete('/user/:userId', UserCtrl.deleteUser)

//another controlelr

module.exports = route
