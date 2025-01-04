import { gemini15Flash } from '@genkit-ai/vertexai';
import { ai } from '../genkit';
import { MenuQuestionInputSchema } from '../types';
import { menuTool } from './tools';

// The prompt uses a tool which will load the menu data,
// if the user asks a reasonable question about the menu.

export const s02_dataMenuPrompt = ai.definePrompt(
  {
    name: 's02_dataMenu',
    model: gemini15Flash,
    input: { schema: MenuQuestionInputSchema },
    output: { format: 'text' },
    tools: [menuTool],
  },
  `
You are acting as a helpful AI assistant named Walt that can answer 
questions about the food available on the menu at Walt's Burgers. 

Answer this customer's question, in a concise and helpful manner,
as long as it is about food on the menu or something harmless like sports.
Use the tools available to answer menu questions.
DO NOT INVENT ITEMS NOT ON THE MENU.

Question:
{{question}} ?
`
);