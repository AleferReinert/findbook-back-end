import { BookRoutes } from '../../src/infra/routes/books.routes'

const serverless = require('serverless-http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

// Conectar ao MongoDB
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Definir rotas
BookRoutes(app)

module.exports.handler = serverless(app)
