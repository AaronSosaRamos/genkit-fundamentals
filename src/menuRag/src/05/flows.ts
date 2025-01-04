import fs from 'fs';
import { z } from 'genkit';
import path from 'path';
import { ai } from '../genkit';
import {
  AnswerOutputSchema,
  MenuQuestionInputSchema,
  TextMenuQuestionInputSchema,
} from '../types';
import { s05_readMenuPrompt, s05_textMenuPrompt } from './prompts';

// Define a flow that takes an image, passes it to Gemini Vision Pro,
// and extracts all of the text from the photo of the menu.
// Note that this example uses a hard-coded image file, as image input
// is not currently available in the Development UI runners.

export const s05_readMenuFlow = ai.defineFlow(
  {
    name: 's05_readMenuFlow',
    inputSchema: z.void(), // input is data/menu.jpeg
    outputSchema: z.object({ menuText: z.string() }),
  },
  async (unused) => {
    const imageDataUrl = await inlineDataUrl('menu.jpeg', 'image/jpeg');
    const response = await s05_readMenuPrompt({
      imageUrl: imageDataUrl,
    });
    return { menuText: response.text };
  }
);

// Define a flow which generates a response to the question.
// Just returns the llm's text response to the question.

export const s05_textMenuQuestionFlow = ai.defineFlow(
  {
    name: 's05_textMenuQuestion',
    inputSchema: TextMenuQuestionInputSchema,
    outputSchema: AnswerOutputSchema,
  },
  async (input) => {
    const response = await s05_textMenuPrompt({
      menuText: input.menuText,
      question: input.question,
    });
    return { answer: response.text };
  }
);

// Define a third composite flow which chains the first two flows

export const s05_visionMenuQuestionFlow = ai.defineFlow(
  {
    name: 's05_visionMenuQuestion',
    inputSchema: MenuQuestionInputSchema,
    outputSchema: AnswerOutputSchema,
  },
  async (input) => {
    // Run the first flow to read the menu image.
    const menuResult = await s05_readMenuFlow();

    // Pass the text of the menu and the question to the second flow
    // and return the answer as this output.
    return s05_textMenuQuestionFlow({
      question: input.question,
      menuText: menuResult.menuText,
    });
  }
);

// Helper to read a local file and inline it as a data url

async function inlineDataUrl(
  imageFilename: string,
  contentType: string
): Promise<string> {
  const filePath = path.join('./data', imageFilename);
  const imageData = fs.readFileSync(filePath);
  return `data:${contentType};base64,${imageData.toString('base64')}`;
}