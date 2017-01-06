/*jslint node: true */
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    fullname: { type: String, required: true },
    birth: Date,
    signUp: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true },
    lastLogin: Date
})

module.exports = mongoose.model('User', UserSchema)
