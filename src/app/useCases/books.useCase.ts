import { generateEmbeddings } from '../../infra/services/openai'
import { bookDto } from '../dto/bookDto'
import { BooksRepository } from '../repository/books.repository'

class BooksUseCase {
	private booksRepository: BooksRepository

	constructor(booksRepository: BooksRepository) {
		this.booksRepository = booksRepository
	}

	async createBook(dto: bookDto) {
		const dataEmbedding = {
			title: dto.title,
			categories: dto.categories,
			authors: dto.authors,
			longDescription: dto.longDescription
		}
		const generateEmbedding = await generateEmbeddings(JSON.stringify(dataEmbedding))

		this.booksRepository.create({
			...dto,
			embeddings: generateEmbedding
		})
	}
	async findBook(dto: bookDto) {
		this.booksRepository.find(dto)
	}
	async updateBook(dto: bookDto, id: string) {
		const dataEmbedding = {
			title: dto.title,
			categories: dto.categories,
			authors: dto.authors,
			longDescription: dto.longDescription
		}
		const generateEmbedding = await generateEmbeddings(JSON.stringify(dataEmbedding))

		this.booksRepository.update(
			{
				...dto,
				embeddings: generateEmbedding
			},
			id
		)
	}
}

export { BooksUseCase }
