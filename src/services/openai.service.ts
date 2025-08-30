import z from 'zod';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';

export function createOpenAIClient() {
	if (!process.env.OPENAI_API_KEY) {
		throw new Error('OPENAI_API_KEY não encontrada nas variáveis de ambiente');
	}

	return new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});
}

export async function bookFinder(search: string) {
	const bookResponseSchema = z.object({
		title: z.string(),
		author: z.string(),
	});

	const client = createOpenAIClient();

	const response = await client.responses.parse({
		model: 'gpt-5',
		input: [
			{
				role: 'system',
				content: 'Você é um guia de livro experiente.',
			},
			{
				role: 'user',
				content: `Encontre o livro mais parecido com o seguinte texto: ${search}`,
			},
		],
		text: {
			format: zodTextFormat(bookResponseSchema, 'event'),
		},
	});

	return response.output_parsed ?? false;
}

export async function imageReader(url: string) {
	const client = createOpenAIClient();

	const response = await client.responses.create({
		model: 'gpt-5',
		input: [
			{
				role: 'user',
				content: [
					{
						type: 'input_text',
						text: 'O que tem nessa imagem?',
					},
					{
						type: 'input_image',
						detail: 'high',
						image_url: url,
					},
				],
			},
		],
	});

	return response.output_text;
}
