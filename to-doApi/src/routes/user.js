const user = require('express').Router()
const getUserDarkMode = require('../controllers/users/getUserDarkMode')

user.get('/getUserDarkMode', async (req, res) => {
    getUserDarkMode(req,res)
})

module.exports = user;