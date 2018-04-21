'use strict'
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return res.status(401).send({ message: 'Failed to authenticate token' })
            req.decoded = decoded
            next()
        })
    } else return res.status(403).send({ message: 'No token provided' })
}