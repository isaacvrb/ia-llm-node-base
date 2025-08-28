import { GoogleGenAI } from '@google/genai';

export function createGoogleClient() {
	if (!process.env.GOOGLE_API_KEY) {
		throw new Error('GOOGLE_API_KEY não encontrada nas variáveis de ambiente');
	}

	return new GoogleGenAI({
		apiKey: process.env.GOOGLE_API_KEY,
	});
}
