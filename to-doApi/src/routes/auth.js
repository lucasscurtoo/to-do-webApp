const auth = require('express').Router();
const User = require('../models/user');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const List = require('../models/list');

const schemaRegister = Joi.object({ //validacion
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
})

const schemaLogin = Joi.object({ 
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
})

auth.post('/register', async (req, res) => {
    //validamos los campos del body y si existe un error 
    //nos devuele el mensaje del error en la validacion que usa joi
    const {error} = schemaRegister.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})
    //nos fijamos si el usuario existe y si efectivamente existe se le devuelve ese message
    const userExists = await User.findOne({ username: req.body.username})
    if (userExists) return res.status(400).json({error: true, message: 'username already taken'})
    //encodeamos la contraseña y guardamos esa
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    const list = new List({
        title: 'My list',
        todo: [],
        user: {username: req.body.username}
    })

    try {
        user.save()
        list.save()
    
        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.header('auth-token',token).json({
            error: null,
            data: {token},
            status: 200
           })
    } catch (error) {
        res.status(404).json(error)  
    }
})

auth.post('/login', async (req, res) => {
     //validamos los campos del body y si existe un error 
    //nos devuele el mensaje del error en la validacion que usa joi
    const {error} = schemaLogin.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})

    const user = await User.findOne({ username: req.body.username})
    if (!user) return res.status(404).json({error: true, message: 'Usuario no encontrado'})

    const passValid = await bcrypt.compare(req.body.password, user.password)
    if (!passValid) return res.status(401).json({error: true, message: 'Contraseña incorrecta'})

    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.TOKEN_SECRET)

   res.header('auth-token',token).json({
    error: null,
    data: {token},
    status: 200
   })
})


module.exports = auth;
