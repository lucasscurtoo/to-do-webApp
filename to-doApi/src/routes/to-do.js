const toDO = require('express').Router()
const Joi = require('@hapi/joi')
const createList = require('../dao/createList')
const List = require('../models/list')
const User = require('../models/user')

const listSchema = Joi.object({
    title: Joi.string().required(),
    username: Joi.string().required(),
})

toDO.post('/createList', async (req,res) => {

    const {error} = listSchema.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})
    
    const listExists = await List.findOne({title: req.body.title, user:{username: req.body.username}})
    if (listExists) return res.status(400).json({error: true, message: "List already exists", status: 400})

    try {
        createList(req.body.title, req.body.username)

        res.json({
            status: 200,
            message: "List created"
        })
        } catch(error){
            res.status(400).json(error)
        }
})

toDO.get('/getUserLists', async (req,res) => {
    const userExists = await User.findOne({username: req.query.username})
    if (!userExists) return res.status(404).json({error: true, message: "User doesnt exists", status: 404})

    const lists = await List.find({user:{username: req.query.username}})
    if (lists.length === 0) return res.status(400).json({error:true, message: "User doesnt have lists", status: 400})
    
    res.json({
        status: 200,
        data: lists
    })
})

module.exports = toDO