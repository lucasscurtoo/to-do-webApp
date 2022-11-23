const tasks = require('express').Router()
const createTask = require('../controllers/task/createTask')
const updateTask = require('../controllers/task/updateTask')

tasks.post('/createTask', async (req, res) => {
    createTask(req,res)
})

tasks.put('/updateTask', async (req,res) => {
    updateTask(req,res)
})

module.exports = tasks
