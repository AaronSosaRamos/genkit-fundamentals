import { gemini15Flash } from '@genkit-ai/vertexai';
import { ai } from '../genkit';
import { DataMenuQuestionInputSchema } from '../types';

export const s04_ragDataMenuPrompt = ai.definePrompt(
  {
    name: 's04_ragDataMenu',
    model: gemini15Flash,
    input: { schema: DataMenuQuestionInputSchema },
    output: { format: 'text' },
    config: { temperature: 0.3 },
  },
  `
You are acting as Walt, a helpful AI assistant here at the restaurant.
You can answer questions about the food on the menu or any other questions
customers have about food in general. 

Here are some items that are on today's menu that are relevant to
helping you answer the customer's question: 
{{#each menuData~}}
- {{this.title}} \${{this.price}}
  {{this.description}}
{{~/each}}

Answer this customer's question:
{{question}}?
`
);