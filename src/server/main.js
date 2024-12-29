import ViteExpress from "vite-express"
import express from "express"
import morgan from "morgan"
import cookieParser from 'cookie-parser'

import { api } from './api/indexApi.js'

const app = express()

app.use(
  morgan('dev'),
  express.urlencoded({ extended: true }),
  express.json(),
  cookieParser()
)

app.use('/api', api)

ViteExpress.listen(app, 3000, () => {
  console.log("http://localhost:3000/")
})
