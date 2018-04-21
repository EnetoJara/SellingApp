'use strict'
// you need to log in and create an account at algoria
const algoliasearch = require('')
const client = algoliasearch('', '')
const index = client.initIndex('')

function getProducts (req, res ,next) {
    if (req.query.query) {
        index.search({ 
            query: req.query.query,
            page: req.query.page
        }, (err, content) => {
            if (err) return res.status(500).send({ message: 'ERROR' })
            else return res.status(200).send({ content: content })
        })
    } else return res.status(404).send({ message: 'QUERY NOT RECEIVED' })
}

module.exports = {
    getProducts
}