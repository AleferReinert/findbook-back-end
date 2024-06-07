import { generateEmbeddings } from '../../infra/services/openai/generateEmbeddings'
import { searchOpenAI } from '../../infra/services/openai/search'
import { bookDto } from '../dto/bookDto'
import { BooksRepository } from '../repository/books.repository'

export interface GptResponse {
	title: string
	authors: string
	categories: string
	longDescription: string
}

class BooksUseCase {
	private booksRepository: BooksRepository

	constructor(booksRepository: BooksRepository) {
		this.booksRepository = booksRepository
	}

	private async generateBookEmbedding(dto: bookDto) {
		const dataEmbedding = {
			title: dto.title,
			categories: dto.categories,
			authors: dto.authors,
			longDescription: dto.longDescription
		}
		return await generateEmbeddings(JSON.stringify(dataEmbedding))
	}

	async createBook(dto: bookDto) {
		const embeddings = await this.generateBookEmbedding(dto)
		return this.booksRepository.create({ ...dto, embeddings })
	}

	async searchBooks(search: string) {
		const embeddings = await generateEmbeddings(search)
		const searchResponse: GptResponse = await searchOpenAI(search)
		const matchedBooks = this.matchedBooks(searchResponse)

		const response = await this.booksRepository.find(search, embeddings, matchedBooks)
		return response
	}

	async updateBook(dto: bookDto, id: string) {
		const embeddings = await this.generateBookEmbedding(dto)
		return this.booksRepository.update({ ...dto, embeddings }, id)
	}

	private matchedBooks(search: GptResponse): Record<string, any> {
		const matchCriteria: Record<string, any> = {}

		if (search.title) matchCriteria.title = search.title
		if (search.authors) matchCriteria.authors = search.authors
		if (search.categories) matchCriteria.categories = search.categories
		if (search.longDescription) matchCriteria.longDescription = search.longDescription

		return { $match: matchCriteria }
	}
}

export { BooksUseCase }
