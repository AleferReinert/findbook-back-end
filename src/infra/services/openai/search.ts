import OpenAI from 'openai'
import { GptResponse } from '../../../app/useCases/books.useCase'
import { HttpException } from '../../../types/HttpException'

export async function searchOpenAI(input: string): Promise<GptResponse> {
	const openAi = new OpenAI({
		apiKey: process.env.OPENAI_API_SECRET_KEY
	})

	try {
		const response = await openAi.chat.completions.create({
			model: 'gpt-3.5-turbo-1106',
			response_format: { type: 'json_object' },
			messages: [
				{
					role: 'system',
					content: `
						- Não é para buscar nada fora dos dados fornecidos
						- Retorne todos as informações em inglês
						- Não é para inventar nenhuma informação, quero apenas que retorne o que foi solicitado.
						- Preciso da resposta no formato de JSON
						- Lista de categorias: ['Ficção', 'Não-ficção', 'Romance', 'Terror', 'Aventura', 'Fantasia', 'Biografia', 'História', 'Autoajuda', 'Técnica', 'Infantil', 'Didático']
						- Identificar se a mensagem do usuário corresponde a alguma categoria da lista de categorias abaixo em português ou inglês
						- Realizar uma busca por title, authors, categories e longDescription
						- Retorne sempre o primeiro autor da lista de authors
						- Se solicitado uma categoria, retorne apenas livros que contenham a categoria solicitada. Se não houver livros na categoria solicitada, retorne uma mensagem informando que não encontrou livros na categoria solicitada.
						- Instruções de formato de saída para JSON: {title: string, authors: string, categories: string, longDescription: string}
					`
				},
				{
					role: 'user',
					content: input
				}
			]
		})
		console.log('searchOpenAI response: ', response)
		const output = JSON.parse(response.choices[0].message.content!)
		return output
	} catch (error: any) {
		throw new HttpException(500, error.message)
	}
}
