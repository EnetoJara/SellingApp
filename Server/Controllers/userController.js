'use strict'
const User = require('../Models/userModel')
const config = require('../config')
const jwt = require('jsonwebtoken')
const Order = require('../Models/orderModel')

function signUp (req, res, next) {
    let user = new User()
    if (!req.body.name || !req.body.email || !req.body.password) return res.status(402).send({ message: 'Missing info' })
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.picture = user.gravatar()
    user.isSeller = (req.body.isSeller) ? req.body.isSeller : false
    User.findOne({ email: req.body.email }).exec((err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR getting User' })
        if (stored) return res.status(403).send({ message: 'Account with that email is already exist' })
        user.save()
        let token = jwt.sign({ user: user }, config.secret, { expiresIn: '7d' })
        return res.status(200).send({ message: 'Enjoy your token', token: token })
    })
}

function login (req, res, next) {
    if (!req.body.email) return res.status(404).send({ message: 'Missing email' })
    User.findOne({ email: req.body.email }).exec((err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR loging' })
        if (!stored) return res.status(404).send({ message: 'User not found' })
        let validPassword = stored.comparePassword(req.body.password)
        if (!validPassword) return res.status(403).send({ message: 'Wrong Password' })
        let token = jwt.sign({ user: stored }, config.secret, { expiresIn: '7d' })
        return res.status(200).send({ message: 'Enjoy your token', toke: token })
    })
}

function getProfile (req, res, next) {
    User.findOne({ _id: req.decoded.user._id }, (err, stored) => {
        return res.status(200).send({ message: 'Successful', user: stored })
    })
}

function postProfile (req, res, next) {
    User.findOne({ _id: req.decoded.user._id }, (err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR getting User' })
        stored.name = (req.body.user.name) ? req.body.user.name : stored.name
        stored.email = (req.body.user.email) ? req.body.user.email : stored.email
        stored.password = (req.body.user.password) ? req.body.user.password : stored.password
        stored.isSeller = req.body.isSeller
        sotred.save()
        return res.status(200).send({ message: 'Information was saved successfully' })
    })
}

function getAddress (req, res, next) {
    User.findOne({ _id: req.decoded.user._id }, (err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR GETTIGN ADDRESS' })
        else return res.status(200).send({ address: stored.address })
    })
}

function postAddress (req, res, next) {
    User.findOne({  _id: re.decoded.user._id }, (err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR POSTING ADDRESS' })
        if (req.body.adress.addr1) stored.address.addr1 = req.body.adress.addr1;
        if (req.body.adress.addr2) stored.address.addr2 = req.body.adress.addr2;
        if (req.body.adress.city) stored.address.city = req.body.adress.city;
        if (req.body.adress.state) stored.address.state = req.body.adress.state;
        if (req.body.adress.country) stored.address.country = req.body.adress.country;
        if (req.body.adress.postalCode) stored.address.postalCode = req.body.adress.postalCode;
        stored.save();
        return res.status(200).send({ message: 'Successfully edited your address' })
    })
}

function myOrders (req, res, next) {
    Order.find({ owner: req.decoded.user._id }).populate('products.product').populate('owner')
    .exec((err, orders) => {
        if (err) return res.status(500).send({ message: 'ERROR getting Orders' })
        else if (!orders) return res.status(404).send({ message: 'Do not have orders, yet' })
        else return res.status(200).send({ orders: orders })
    })
}

function orders (req, res, next) {
    Order.findOne({ _id: req.params.id }).deepPopulate('products.product.owner').populate('owner')
    .exec((err, order) => {
        if (err) return res.status(500).send({ message: 'ERROR getting order' })
        else if (!order) return res.status(404).send({ message: 'order not found' })
        else return res.status(200).send({ order: order })
    })
}

module.exports = {
    signUp, login, getProfile,
    postProfile, getAddress,
    postAddress, orders,
    myOrders
}