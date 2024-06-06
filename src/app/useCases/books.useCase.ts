import { generateEmbeddings } from '../../infra/services/openai/generateEmbeddings'
import { searchOpenAI } from '../../infra/services/openai/search'
import { bookDto } from '../dto/bookDto'
import { BooksRepository } from '../repository/books.repository'

export type GptResponse = {
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
	async searchBooks(search: string) {
		const generateEmbedding = await generateEmbeddings(search)
		const searchResponse: GptResponse = await searchOpenAI(search)
		const matchedBooks = this.matchedBooks(searchResponse)

		console.log('matchedBooks: ', matchedBooks)
		return this.booksRepository.find(search, generateEmbedding, matchedBooks)
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

	private matchedBooks(search: GptResponse): Record<string, any> {
		const matchedBooks = { $match: {} }

		if (search.title) {
			matchedBooks.$match = {
				title: search.title
			}
		}

		if (search.authors) {
			matchedBooks.$match = {
				authors: search.authors
			}
		}

		if (search.categories) {
			matchedBooks.$match = {
				categories: search.categories
			}
		}

		if (search.longDescription) {
			matchedBooks.$match = {
				longDescription: search.longDescription
			}
		}

		return matchedBooks
	}
}

export { BooksUseCase }
