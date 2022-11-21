const lists = require('express').Router()
const createNewList = require('../controllers/list/createList')
const getUserLists = require('../controllers/list/getLists')

lists.post('/createList', async (req,res) => {
    createNewList(req,res)
   
})

lists.get('/getUserLists', async (req,res) => {
    getUserLists(req,res)
})

module.exports = lists