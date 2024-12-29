import express from 'express'

const api = express.Router()

import { apiUser } from './apiUser.js'
import { mwVerifyToken } from '../middleware/mwVerifyToken.js'
import { apiStore } from './apiStore.js'
import { apiFactory } from './apiFactory.js'

api.use('/user', apiUser)
api.use(mwVerifyToken)
api.use('/store', apiStore)
api.use('/factory', apiFactory)

export { api }