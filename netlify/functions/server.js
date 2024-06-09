const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const { BookRoutes } = require('../../dist/infra/routes/books.routes')

const app = express()

app.use(cors())
app.use(express.json())

const router = express.Router()
BookRoutes(router)

app.use('/.netlify/functions/server', router)

module.exports.handler = serverless(app)
