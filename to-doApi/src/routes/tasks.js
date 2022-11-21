const tasks = require('express').Router()
const createTask = require('../controllers/task/createTask')

tasks.post('/createTask', async (req, res) => {
    createTask(req,res)
})

module.exports = tasks
