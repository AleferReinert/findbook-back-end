// import { BookRoutes } from '../../src/infra/routes/books.routes'

// const express = require('express')
// const serverless = require('serverless-http')
// const cors = require('cors')

// const app = express()

// app.use(cors())
// app.use(express.json())

// const router = express.Router()
// BookRoutes(router)

// app.use('/.netlify/functions/server', router)

// module.exports.handler = serverless(app)

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
app.get('/', (req, res) => {
	res.send('Hello from Express on Netlify Functions!')
})

// Outras rotas aqui

module.exports.handler = serverless(app)
