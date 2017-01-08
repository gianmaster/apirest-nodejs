/*jslint node: true */
"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config/index')

const router = require('./routes/index');

const app = express();

//agregamos el bodyParser como middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rutas
router(app);

const util = require('./util/util')
app.get('/test/:word', (req, res) => {
    console.log(`entro con la palabra ${req.params.word}`)
    util.getHash(req.params.word, function(hash){
        res.status(200).send({ message: hash})
    })
    
})

const deploy = (app) => {
    app.listen(config.port, () => {
        console.log(`Servidor APIREST corriendo en el puerto :${config.port}`);
    });
};

//conexion con mongo db
mongoose.connect(config.db, (err) => {
    if(err){
        return console.log(`Error al tratar de conectar con la base de datos: ${err}`);
    }

    console.log('Conexion con la base de datos establecida');
    deploy(app);

});

