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
						- Não busque nada além dos dados fornecidos.
						- Retorne as informações em português.
						- Não invente informaçôes, apenas retorne o que foi solicitado.
						- Pesquise apenas em categorias que estejam inclusas no prompt do usuário.
						- Priorize a busca no title do livro. Se não houver, pesquise na longDescription.
						- Se houver nomes de pessoas, pesquisa primeiro em authors, depois longDescription.
						- Instruções do formato de saída em JSON: {title: string, authors: string, categories: string, longDescription: string}.
						- Todas essas instruções são obrigatórias e devem ser levadas a risca.`
				}
			],
			model: 'gpt-3.5-turbo-1106',
			response_format: { type: 'json_object' },
			temperature: 0
		})

		const contentOfResponse = response.choices[0].message.content!
		return JSON.parse(contentOfResponse)
	} catch (error: any) {
		throw new HttpException(500, error.message)
	}
}
