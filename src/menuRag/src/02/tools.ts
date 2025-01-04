import { z } from 'genkit';
import { ai } from '../genkit';
import { MenuItem, MenuItemSchema } from '../types';

const menuData: Array<MenuItem> = require('../../data/menu.json');

export const menuTool = ai.defineTool(
  {
    name: 'todaysMenu',
    description: "Use this tool to retrieve all the items on today's menu",
    inputSchema: z.object({}),
    outputSchema: z.object({
      menuData: z
        .array(MenuItemSchema)
        .describe('A list of all the items on the menu'),
    }),
  },
  async () => Promise.resolve({ menuData: menuData })
);
