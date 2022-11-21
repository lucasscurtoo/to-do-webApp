const User = require('../..//models/user');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const createList = require('../../dao/createList');

const schemaRegister = Joi.object({ //validacion
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
})

const register = async (req,res) => {
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

    try {
        user.save()
        createList("", req.body.username)
    
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
}

module.exports = register;
