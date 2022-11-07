const toDO = require('express').Router()

toDO.get('/', (req,res) => {
    res.send('nashe')
})

module.exports = toDO