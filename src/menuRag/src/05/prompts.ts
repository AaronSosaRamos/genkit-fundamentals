import { gemini15Flash } from '@genkit-ai/vertexai';
import { z } from 'genkit';
import { ai } from '../genkit';
import { TextMenuQuestionInputSchema } from '../types';

export const s05_readMenuPrompt = ai.definePrompt(
  {
    name: 's05_readMenu',
    model: gemini15Flash,
    input: {
      schema: z.object({
        imageUrl: z.string(),
      }),
    },
    output: { format: 'text' },
    config: { temperature: 0.1 },
  },
  `
Extract _all_ of the text, in order, 
from the following image of a restaurant menu.

{{media url=imageUrl}} 
`
);

export const s05_textMenuPrompt = ai.definePrompt(
  {
    name: 's05_textMenu',
    model: gemini15Flash,
    input: { schema: TextMenuQuestionInputSchema },
    output: { format: 'text' },
    config: { temperature: 0.3 },
  },
  `
You are acting as Walt, a helpful AI assistant here at the restaurant.
You can answer questions about the food on the menu or any other questions
customers have about food in general. 

Here is the text of today's menu to help you answer the customer's question:
{{menuText}}

Answer this customer's question:
{{question}}?
`
);