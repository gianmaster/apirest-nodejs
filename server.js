/*jslint node: true */
"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/index')

const app = express();

//modelo base de datos
const User = require('./models/user');

//agregamos el bodyParser como middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rutas
app.get('/api/usuario', (req, res) => {
    User.find({}, (err, usuarios) => {
        
        if(err) {return res.status(500).send({message: `Error al consultar los datos: ${err}`})}

        if(!usuarios) { return res.status(404).send({message: 'No se encontraron registros'})}

        res.status(200).send({data: usuarios});

    });

});

app.get('/api/usuario/:user', (req, res) => {
    console.log(`GET /api/usuario/${req.params.user}`);
    User.findById(req.params.user , (err, usuario) => {

        if (err) {return res.status(500).send({message: `Error en la peticion: ${err}`})};

        if (!usuario) {return res.status(404).send({message: 'Usuario no existe'})};

        res.status(200).send({usuario});
    });
});

app.post('/api/usuario', (req, res) => {
    console.log('POST /api/usuario');
    console.log(req.body);

    let usuario = new User();
    let d = req.body;
    usuario.nombres = d.nombres;
    usuario.apellidos = d.apellidos;
    usuario.fecha_nacimiento = d.fecha_nacimiento;
    usuario.estado_civil = d.estado_civil;
    usuario.profesion = d.profesion;
    usuario.correo = d.correo;

    usuario.save((err, usuarioStored) => {

        if(err) { res.status(500).send({message: `Error al registrar el usuario: ${err}`}) };

        res.status(201).send({message: 'Usuario registrado correctamente', usuario: usuarioStored});
    })
});

app.put('/api/usuario/:userId', (req, res) => {

    console.log(`PUT /api/usuario/${req.params.userId}`);

    User.findByIdAndUpdate(req.params.userId, req.body, (err, usuario) => {

        if(err) { res.status(500).send({message: `Error al tratar de actualizar el registro: ${err}`})}

        res.status(200).send({message: 'Se actualizó el registro correctamente'});
    });
});

app.delete('/api/usuario/:userId', (req, res) => {
    
    console.log(`DELETE /api/usuario/${req.params.userId}`);

    User.findById(req.params.userId, (err, usuario) => {
        
        if(err) { res.status(500).send({message: `Error al tratar de eliminar el registro: ${err}`})}

        usuario.remove((err) => {
            if(err) { res.status(500).send({message: `Error al tratar de eliminar el registro de la base de datos: ${err}`})}

            res.status(200).send({message: 'Se eliminó el registro correctamente'});
        });
    });
});

//conexion con mongo db
mongoose.connect(config.db, (err, res) => {
    if(err){
        return console.log(`Error al tratar de conectar con la base de datos: ${err}`);
    }
    console.log('Conexion con la base de datos establecida');
    arrancaServidor(app);
});

const arrancaServidor = (app) => {
    app.listen(config.port, () => {
        console.log(`Servidor APIREST corriendo en el puerto :${config.port}`);
    });
};

