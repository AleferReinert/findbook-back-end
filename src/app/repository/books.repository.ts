import { BookEntity } from '../../domain/entity/book.entity'
import { bookDto } from '../dto/bookDto'

abstract class BooksRepository {
	abstract create(dto: bookDto): void
	abstract find(
		search: string,
		embedding: number[],
		matchedBooks: Record<string, any>
	): Promise<BookEntity[] | null>
	abstract update(dto: bookDto, id: string): Promise<BookEntity | null>
	abstract deleteByIsbn(isbn: string): void
}

export { BooksRepository }
