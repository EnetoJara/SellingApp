'use strict'

const api = require('./server')
const http = require('http')
const mongoose = require('mongoose')
const config = require('./config')
const server = http.createServer(api)

mongoose.Promise = global.Promise
mongoose.connect(config.database,{ useMongoClient: true }).then(() => {
    server.listen(config.port).on('error', onError).on('listening', onListening)
}).catch((err => console.log(err)))

function onError (error) {
    if (error.syscall !== 'listen') { throw error }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening () {
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + bind)
}