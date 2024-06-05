import { BookEntity } from '../../domain/entity/book.entity'
import { bookDto } from '../dto/bookDto'

abstract class BooksRepository {
	abstract create(dto: bookDto): void
	abstract find(dto: bookDto): Promise<BookEntity | null>
	abstract update(dto: bookDto, id: string): Promise<BookEntity | null>
}

export { BooksRepository }
