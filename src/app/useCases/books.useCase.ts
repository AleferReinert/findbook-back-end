import { bookDto } from '../dto/bookDto'
import { BooksRepository } from '../repository/books.repository'

class BooksUseCase {
	private booksRepository: BooksRepository

	constructor(booksRepository: BooksRepository) {
		this.booksRepository = booksRepository
	}

	async createBook(dto: bookDto) {
		this.booksRepository.create(dto)
	}
	async findBook(dto: bookDto) {
		this.booksRepository.find(dto)
	}
	async updateBook(dto: bookDto, id: string) {
		this.booksRepository.update(dto, id)
	}
}

export { BooksUseCase }
