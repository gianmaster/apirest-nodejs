/*jslint node: true */
"use strict"

const api = require('./api')

module.exports = (app) => {
    app.use('/api', api)
}
