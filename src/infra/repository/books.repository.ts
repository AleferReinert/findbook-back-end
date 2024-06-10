import mongoose from 'mongoose'
import { bookDto } from '../../app/dto/bookDto'
import { BooksRepository } from '../../app/repository/books.repository'
import { BookEntity } from '../../domain/entity/book.entity'

const booksSchema = new mongoose.Schema({
	title: String,
	isbn: String,
	pageCount: Number,
	publishedDate: { $date: String },
	thumbnailUrl: String,
	shortDescription: String,
	longDescription: String,
	status: String,
	authors: [String],
	categories: [String],
	embeddings: [Number]
})

const Books = mongoose.model('books', booksSchema)

class BooksRepositoryMongoose implements BooksRepository {
	// Verifica se já existe um livro com o isbn informado. Se não houver, é criado o livro.
	async create(dto: bookDto) {
		const existingBook = await Books.findOne({ isbn: dto.isbn })
		if (existingBook) {
			throw new Error('A book with this isbn already exists')
		} else {
			const newBooks = new Books(dto)
			return newBooks.save()
		}
	}

	async find(search: string, embedding: number[], matchedBooks: any): Promise<BookEntity[] | null> {
		const response = await Books.aggregate([
			{
				$vectorSearch: {
					index: 'vector_index',
					path: 'embeddings',
					queryVector: embedding,
					numCandidates: 150,
					limit: 6
				}
			},
			{
				$match: {
					$or: [
						{ title: new RegExp(matchedBooks.title, 'i') },
						{ authors: new RegExp(matchedBooks.authors, 'i') },
						{ categories: new RegExp(matchedBooks.categories, 'i') },
						{ longDescription: new RegExp(matchedBooks.longDescription, 'i') }
					]
				}
			},
			{
				$project: {
					_id: 1,
					title: 1,
					isbn: 1,
					pageCount: 1,
					publishedDate: 1,
					thumbnailUrl: 1,
					shortDescription: 1,
					longDescription: 1,
					status: 1,
					authors: 1,
					categories: 1,
					score: { $meta: 'vectorSearchScore' }
				}
			}
		])
		return response
	}

	async update(dto: bookDto, id: string): Promise<BookEntity | null> {
		const response = await Books.findByIdAndUpdate(id, dto)
		return response ? response.toObject() : null
	}

	async deleteByIsbn(isbn: string) {
		try {
			const result = await Books.deleteOne({ isbn: isbn })
			return result.deletedCount === 1
		} catch (error) {
			console.error('Erro ao deletar livro por ISBN: ', error)
			return null
		}
	}
}

export { BooksRepositoryMongoose }
