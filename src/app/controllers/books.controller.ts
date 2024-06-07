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

			if (!response) {
				return { status: 404, message: 'Book not found' }
			}

			return {
				status: 200,
				message: 'Book found',
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
		try {
			const id: string = httpRequest.params.id
			const body: bookDto = httpRequest.body
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
