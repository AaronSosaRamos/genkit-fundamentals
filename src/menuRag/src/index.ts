import 'dotenv/config';

// 01
export { s01_staticMenuDotPrompt, s01_vanillaPrompt } from './01/prompts';
// 02
export { s02_menuQuestionFlow } from './02/flows';
export { s02_dataMenuPrompt } from './02/prompts';
// 03
export { s03_multiTurnChatFlow } from './03/flows';
export { s03_chatPreamblePrompt } from './03/prompts';
// 04
export { s04_indexMenuItemsFlow, s04_ragMenuQuestionFlow } from './04/flows';
export { s04_ragDataMenuPrompt } from './04/prompts';
// 05
export {
  s05_readMenuFlow,
  s05_textMenuQuestionFlow,
  s05_visionMenuQuestionFlow,
} from './05/flows';
export { s05_readMenuPrompt, s05_textMenuPrompt } from './05/prompts';
