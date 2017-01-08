/*jslint node: true */
'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = Schema({
    email: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    fullname: { type: String, required: true, index: true },
    birth: Date,
    avatar: String,
    //password: { type: String, select: false },
    password: String,
    signUp: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true },
    lastLogin: Date
})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.gravatar = () => {
    if(!this.email) { return 'https://gravatar.com/avatar/?s=200&d=retro'}

    const md5 = crypto.createHash('md5')
        .update(this.email)
        .digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)

/*
module.exports.createUser = function(newUser, callback){
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash
    newUser.save(callback)
}

*/
