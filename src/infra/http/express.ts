import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, urlencoded } from 'express'
import { connect } from '../database/mongoose'
import { BookRoutes } from '../routes/books.routes'

dotenv.config()

class Express {
	app: Application

	constructor() {
		this.app = express()
		this.initMiddlewares()
		BookRoutes(this.app)
	}

	private initMiddlewares() {
		this.app.use(express.json())
		this.app.use(urlencoded({ extended: true }))
		this.app.use(cors())
	}

	listen() {
		this.app.listen(3333, () => {
			connect()
			console.log('Server running on port 3333')
		})
	}
}

export default Express
