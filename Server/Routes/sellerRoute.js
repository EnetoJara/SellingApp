'use strict'

const api = require('express').Router()
const checkJWT = require('../middlewares/check-jwt')
const controller = require('../Controllers/sellerController')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config')
const s3 = new aws.S3({
    accessKeyId:  config.S3accessKeyId,
    secretAccessKey: config.S3secretAccessKey
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucket,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

api.route('/product')
    .get([ checkJWT ], controller.getProduct)
    .post([ checkJWT, upload.single('product_picture') ], controller.postProduct)

module.exports = api