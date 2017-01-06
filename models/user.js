/*jslint node: true */
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    username: String,
    nombres: String,
    correo: String,
    apellidos: String,
    fecha_nacimiento: Date,
    profesion: String,
    activo: { type: Boolean, default: true },
    estado_civil: { type: String, enum: ['Soltero','Casado', 'Divorciado', 'Viudo']}
})

module.exports = mongoose.model('User', UserSchema)
