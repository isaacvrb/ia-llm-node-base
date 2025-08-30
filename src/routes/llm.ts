import express from 'express';
import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';
import { bookFinder, imageReader } from '../services/openai.service.js';
import {
	createXAIClient,
	createGroqClient,
	createOllamaClient,
	createOpenAIClient,
	createGoogleClient,
	createAnthropicClient,
} from '../services/index.js';

const router = express.Router();

// Route para OpenAI
router.get('/openai', async (req, res) => {
	const client = createOpenAIClient();

	const input = 'Qual o sentido da vida?';

	const response = await client.responses.create({
		model: 'gpt-5-nano',
		reasoning: {
			effort: 'low',
		},
		input: [
			{
				role: 'system',
				content: [
					{
						type: 'input_text',
						text: 'Seja direto e conciso. Responda em apenas uma frase',
					},
				],
			},
			{
				role: 'user',
				content: [
					{
						type: 'input_text',
						text: input,
					},
				],
			},
		],
	});

	res.json({
		output: response.output_text,
	});
});

router.get('/openai/book-finder', async (req, res) => {
	const search = 'O livro fala que o sentido da vida é 42';

	const book = await bookFinder(search);

	if (!book) {
		return res.status(404).json({
			book: null,
			error: 'Livro não encontrado',
		});
	}

	res.json({
		book,
		error: null,
	});
});

router.get('/openai/image-reader', async (req, res) => {
	const url =
		'https://static9.depositphotos.com/1144687/1126/i/450/depositphotos_11267738-stock-photo-fall-coffee-bean.jpg';

	const description = await imageReader(url);

	res.json({
		description,
	});
});

// Route para Anthropic (Claude)
router.get('/anthropic', async (req, res) => {
	const input = 'Qual o sentido da vida?';

	const client = createAnthropicClient();

	const response = await client.messages.create({
		model: 'claude-sonnet-4-20250514',
		max_tokens: 1024,
		messages: [
			{
				role: 'assistant',
				content: 'Seja direto e conciso. Responda em apenas uma frase',
			},
			{
				role: 'user',
				content: input,
			},
		],
	});

	let message = '';

	for (const contentItem of response.content) {
		if (contentItem.type === 'text') {
			message = contentItem.text;
		}
	}

	res.json({ message });
});

// Route para xAI (Grok)
router.get('/xai', async (req, res) => {
	const input = 'Qual o sentido da vida?';

	const { text } = await generateText({
		model: xai('grok-3-mini'),
		system: 'Seja direto e conciso. Responda em apenas uma frase',
		prompt: input,
	});

	res.json({
		message: text,
	});
});

// Route para Google AI (Gemini)
router.get('/google', async (req, res) => {
	const input = 'Qual o sentido da vida?';

	const client = createGoogleClient();

	const response = await client.models.generateContent({
		model: 'gemini-2.5-flash',
		config: {
			systemInstruction: 'Seja direto e conciso. Responda em apenas uma frase',
		},
		contents: input,
	});

	res.json({
		message: response.text,
	});
});

// Route para Groq
router.get('/groq', async (req, res) => {
	const input = 'Qual o sentido da vida?';

	const client = createGroqClient();

	const response = await client.chat.completions.create({
		model: 'llama-3.3-70b-versatile',
		messages: [
			{
				role: 'system',
				content: 'Seja direto e conciso. Responda em apenas uma frase',
			},
			{
				role: 'user',
				content: input,
			},
		],
	});

	const message = response.choices[0].message.content;

	res.json({
		message,
	});
});

// Route para Ollama
router.get('/ollama', async (req, res) => {
	const input = 'Qual o sentido da vida?';

	const client = createOllamaClient();

	const response = await client.chat({
		model: 'llama3.1',
		messages: [
			{
				role: 'system',
				content: 'Seja direto e conciso. Responda em apenas uma frase',
			},
			{
				role: 'user',
				content: input,
			},
		],
	});

	res.json({
		message: response.message.content,
	});
});

export default router;
