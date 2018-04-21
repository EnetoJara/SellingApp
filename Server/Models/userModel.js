'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    picture: String,
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    isSeller: { type: Boolean, default: false },
    created: {  type: Date, default: Date.now }
})

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.hash(this.password, null, null, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

UserSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.password)
}

UserSchema.methods.gravatar = function (size) {
    size = (size) ? size : 200
    if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro'
    let md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro'
}

module.exports = mongoose.model('user', UserSchema)