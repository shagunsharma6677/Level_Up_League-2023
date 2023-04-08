const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, unique: true, required: true },
})

const UserModel = mongoose.model('user', userSchema)


module.exports = { UserModel }