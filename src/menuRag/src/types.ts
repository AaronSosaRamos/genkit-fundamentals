import * as z from 'zod';

// The data model for a restaurant menu

export const MenuItemSchema = z.object({
  title: z.string().describe('The name of the menu item'),
  description: z
    .string()
    .describe('Details including ingredients and preparation'),
  price: z.number().describe('Price in dollars'),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

// Input schema for a question about the menu

export const MenuQuestionInputSchema = z.object({
  question: z.string(),
});

// Output schema containing an answer to a question

export const AnswerOutputSchema = z.object({
  answer: z.string(),
});

// Input schema for a question about the menu
// where the menu is provided in JSON data.

export const DataMenuQuestionInputSchema = z.object({
  menuData: z.array(MenuItemSchema),
  question: z.string(),
});

// Input schema for a question about the menu
// where the menu is provided as unstructured text.

export const TextMenuQuestionInputSchema = z.object({
  menuText: z.string(),
  question: z.string(),
});

// Also export Typescript types for each of these Zod schemas
export type MenuQuestionInput = z.infer<typeof MenuQuestionInputSchema>;
export type AnswerOutput = z.infer<typeof AnswerOutputSchema>;
export type DataMenuPromptInput = z.infer<typeof DataMenuQuestionInputSchema>;
export type TextMenuQuestionInput = z.infer<typeof TextMenuQuestionInputSchema>;