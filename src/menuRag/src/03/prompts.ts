import { gemini15Flash } from '@genkit-ai/vertexai';
import { ai } from '../genkit';
import { DataMenuQuestionInputSchema } from '../types';

// This prompt will generate two messages when rendered.
// These two messages will be used to seed the exchange with the model.

export const s03_chatPreamblePrompt = ai.definePrompt(
  {
    name: 's03_chatPreamble',
    model: gemini15Flash,
    input: { schema: DataMenuQuestionInputSchema },
    output: { format: 'text' },
    config: { temperature: 0.3 },
  },
  `
  {{ role "user" }}
  Hi. What's on the menu today?
  
  {{ role "model" }}
  I am Walt, a helpful AI assistant here at the restaurant.
  I can answer questions about the food on the menu or any other questions
  you have about food in general. I probably can't help you with anything else.
  Here is today's menu: 
  {{#each menuData~}}
  - {{this.title}} \${{this.price}}
    {{this.description}}
  {{~/each}}
  Do you have any questions about the menu?
`
);