// netlify example
import express, { Router } from 'express'
import { BookRoutes } from '../../src/infra/routes/books.routes'

const api = express()

// const router = Router()
// router.get('/hello', (req, res) => res.send('Hello World!'))

// api.use('/', router)

// export const handler = serverless(api)

// me
const router = Router()
api.use('/.netlify/functions/', router)
BookRoutes(router)
