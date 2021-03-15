const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema ({
    email: { type: String, required: true},
    password: { type: String, required: true},
    todo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

userSchema.pre("save", async function(next){
    let user = this
    if(!user.isModified("password")) return next()
    let hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    next()
})

module.exports = mongoose.model("User", userSchema)