import { devLocalVectorstore } from '@genkit-ai/dev-local-vectorstore';
import { textEmbedding004, vertexAI } from '@genkit-ai/vertexai';
import { genkit } from 'genkit';

export const ai = genkit({
  plugins: [
    vertexAI({ location: 'us-central1' }),
    devLocalVectorstore([
      {
        indexName: 'menu-items',
        embedder: textEmbedding004,
        embedderOptions: { taskType: 'RETRIEVAL_DOCUMENT' },
      },
    ]),
  ],
});