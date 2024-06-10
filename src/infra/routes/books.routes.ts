import { Router } from 'express'
import { BooksController } from '../../app/controllers/books.controller'
import { BooksUseCase } from '../../app/useCases/books.useCase'
import { BooksRepositoryMongoose } from '../repository/books.repository'
import { routerAdapter } from './routerAdapter'

export const BookRoutes = (router: Router) => {
	const booksUseCase = new BooksUseCase(new BooksRepositoryMongoose())
	const booksController = new BooksController(booksUseCase)

	router.get('/', (req, res) => res.send('Hello World'))

	router.post('/books', routerAdapter(booksController, 'create'))
	router.get('/books', routerAdapter(booksController, 'find'))
	router.put('/books/:id', routerAdapter(booksController, 'update'))
	router.delete('/books/:isbn', routerAdapter(booksController, 'delete'))
}
