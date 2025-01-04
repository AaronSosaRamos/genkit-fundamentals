import { ai } from '../genkit';
import { AnswerOutputSchema, MenuQuestionInputSchema } from '../types';
import { s02_dataMenuPrompt } from './prompts';

// Define a flow which generates a response from the prompt.

export const s02_menuQuestionFlow = ai.defineFlow(
  {
    name: 's02_menuQuestion',
    inputSchema: MenuQuestionInputSchema,
    outputSchema: AnswerOutputSchema,
  },
  async (input) => {
    const { text } = await s02_dataMenuPrompt({ question: input.question });
    return { answer: text };
  }
);