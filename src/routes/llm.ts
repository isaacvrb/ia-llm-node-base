import express from 'express';
import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';
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
						text: 'Qual o sentido da vida?',
					},
				],
			},
		],
	});

	res.json({
		output: response.output_text,
	});
});

// Route para Anthropic (Claude)
router.get('/anthropic', async (req, res) => {
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
				content: 'Qual o sentido da vida?',
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
	const client = createXAIClient();

	const { text } = await generateText({
		model: xai('grok-3-mini'),
		system: 'Seja direto e conciso. Responda em apenas uma frase',
		prompt: 'Qual o sentido da vida?',
	});

	res.json({
		message: text,
	});
});

// Route para Google AI (Gemini)
router.get('/google', async (req, res) => {
	const client = createGoogleClient();

	const response = await client.models.generateContent({
		model: 'gemini-2.5-flash',
		config: {
			systemInstruction: 'Seja direto e conciso. Responda em apenas uma frase',
		},
		contents: 'Qual o sentido da vida?',
	});

	res.json({
		message: response.text,
	});
});

// Route para Groq
router.get('/groq', async (req, res) => {
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
				content: 'Qual o sentido da vida?',
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
				content: 'Qual o sentido da vida?',
			},
		],
	});

	res.json({
		message: response.message.content,
	});
});

export default router;
