/*jslint node: true */
"use strict"

const bcrypt = require('bcrypt-nodejs')

module.exports.getHash = function(word, callback){
    bcrypt.genSalt(10, (err, salt) => {
        if(err) { throw(err) }

        bcrypt.hash(word, salt, null, (err, hash) => {
            if(err) { throw(err) }

            return callback(hash)
        })
    })
}
