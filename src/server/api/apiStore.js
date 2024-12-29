import crypto from 'node:crypto'
import express from 'express'

const apiStore = express.Router()



apiStore.post('/storeIn', (req, res) => {
    res.send('入库')
})

apiStore.post('/storeOut', (req, res) => {
    res.send('出库')
})

export { apiStore }