import express from 'express'

import { db } from '../database/db.js'
import { Factory } from '../constructor/factory.js'

const apiFactory = express.Router()
const apiBase = express.Router()
const apiBrand = express.Router()

apiFactory.post('/save', (req, res) => {
    console.log(req.body)
    const factory = new Factory(req.body)
    factory.savePromise().then(result => {
        result.factory = factory
        res.send({ factory: result })
    }).catch(result => res.send({ elMessage: { message: result, type: 'error' } }))
})

apiFactory.delete('/del/:id', (req, res) => {
    Factory.findByIdPromise(req.params.id).then(result => {
        if (result) {
            (new Factory(result)).deletePromise()
                .then(result => res.send({ elMessage: result }))
                .catch(result => res.send({ elMessage: { message: result, type: 'error' } }))
        }
    })
})

apiFactory.get('/list', (req, res) => {
    Factory.listPromise(req.params.filters).then(res.send)
    db.all(`SELECT * FROM "factory"`, (err, rows) => {
        res.send(err
            ? { message: err, type: 'error' }
            : rows.map(row => new Factory(row)))
    })
})

apiFactory.use('/base', apiBase)
apiFactory.use('/brand', apiBrand)

export { apiFactory }