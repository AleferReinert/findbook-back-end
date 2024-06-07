import OpenAI from 'openai'
import { GptResponse } from '../../../app/useCases/books.useCase'
import { HttpException } from '../../../types/HttpException'

export async function searchOpenAI(input: string): Promise<GptResponse> {
	const openAi = new OpenAI({
		apiKey: process.env.OPENAI_API_SECRET_KEY
	})

	try {
		const response = await openAi.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: input
				},
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
						- Instruções de formato de saída para JSON: {title: string, authors: string, categories: string, longDescription: string}`
				}
			],
			model: 'gpt-3.5-turbo-1106',
			response_format: { type: 'json_object' }
		})

		const contentOfResponse = response.choices[0].message.content!
		return JSON.parse(contentOfResponse)
	} catch (error: any) {
		throw new HttpException(500, error.message)
	}
}
