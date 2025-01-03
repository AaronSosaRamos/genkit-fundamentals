// import the Genkit and Google AI plugin libraries
import { gemini20FlashExp, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// configure a Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20FlashExp, // set default model
});

export async function fundamentals_test(query) {
  // make a generation request
  const { text } = await ai.generate(query);
  console.log(text);
  return text;
};