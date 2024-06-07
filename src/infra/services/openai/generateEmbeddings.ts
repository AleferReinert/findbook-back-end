import OpenAI from 'openai'
import { HttpException } from '../../../types/HttpException'

export async function generateEmbeddings(input: string) {
	const openAi = new OpenAI({
		apiKey: process.env.OPENAI_API_SECRET_KEY
	})

	try {
		const response = await openAi.embeddings.create({
			input,
			model: 'text-embedding-ada-002'
		})
		return response.data[0].embedding
	} catch (error: any) {
		throw new HttpException(500, error.message)
	}
}
