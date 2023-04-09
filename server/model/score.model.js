const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    player1: Number, 
    player2: Number 
})

const ScoreModel = mongoose.model('score', scoreSchema)

module.exports = { ScoreModel } 
