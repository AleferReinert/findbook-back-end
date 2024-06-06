import { HttpRequest, HttpResponse } from '../../infra/http/httpAdapter'
import { bookDto } from '../dto/bookDto'
import { BooksUseCase } from '../useCases/books.useCase'

class BooksController {
	constructor(private readonly booksUseCase: BooksUseCase) {}

	async create(httpRequest: HttpRequest): Promise<HttpResponse> {
		const body: bookDto = httpRequest.body

		try {
			const response = await this.booksUseCase.createBook(body)
			return {
				status: 201,
				message: 'Book created',
				data: response
			}
		} catch (error: any) {
			return {
				status: 400,
				message: error.message
			}
		}
	}
	async find(httpRequest: HttpRequest): Promise<HttpResponse> {
		const search: string = httpRequest.query.search

		try {
			const response = await this.booksUseCase.searchBooks(search)
			return {
				status: 200,
				message: 'Book founded',
				data: response
			}
		} catch (error: any) {
			return {
				status: 400,
				message: error.message
			}
		}
	}
	async update(httpRequest: HttpRequest): Promise<HttpResponse> {
		const body: bookDto = httpRequest.body
		const id: string = httpRequest.params.id

		try {
			const response = await this.booksUseCase.updateBook(body, id)
			return {
				status: 201,
				message: 'Book created',
				data: response
			}
		} catch (error: any) {
			return {
				status: 400,
				message: error.message
			}
		}
	}
}

export { BooksController }
