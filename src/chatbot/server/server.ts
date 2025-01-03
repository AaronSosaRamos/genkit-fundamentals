import { gemini15Flash, vertexAI } from '@genkit-ai/vertexai';
import {
  VertexAIEvaluationMetricType,
  vertexAIEvaluation,
} from '@genkit-ai/vertexai/evaluation';
import { llama31, vertexAIModelGarden } from '@genkit-ai/vertexai/modelgarden';
import { ModelReference, PartSchema, genkit, run } from 'genkit';
import { GenerateResponseChunkSchema } from 'genkit/model';
import { z } from 'zod';
import { inMemoryStore } from './memory.ts';

export const AgentInput = z.object({
  conversationId: z.string(),
  prompt: z.union([z.string(), PartSchema, z.array(PartSchema)]),
  config: z.record(z.string(), z.any()).optional(),
  llmIndex: z.number(),
});

const ai = genkit({
  plugins: [
    vertexAI({
      location: 'us-central1',
    }),
    vertexAIModelGarden({
      location: 'us-central1',
      models: [llama31],
    }),
    vertexAIEvaluation({
      location: 'us-central1',
      metrics: [
        VertexAIEvaluationMetricType.SAFETY,
        VertexAIEvaluationMetricType.FLUENCY,
      ],
    }),
  ],
});

const llms: ModelReference<any>[] = [gemini15Flash, llama31];

const historyStore = inMemoryStore();

export const chatbotFlow = ai.defineStreamingFlow(
  {
    name: 'chatbotFlow',
    inputSchema: AgentInput,
    outputSchema: z.string(),
    streamSchema: GenerateResponseChunkSchema,
  },
  async (request, streamingCallback) => {
    // Retrieve conversation history.
    const history = await run(
      'retrieve-history',
      request.conversationId,
      async () => {
        return (await historyStore?.load(request.conversationId)) || [];
      }
    );

    // Run the user prompt (with history) through the primary LLM.
    const mainResp = await ai.generate({
      prompt: request.prompt,
      messages: history,
      model: llms[request.llmIndex],
      streamingCallback,
    });

    // Save history.
    await run(
      'save-history',
      {
        conversationId: request.conversationId,
        history: mainResp.messages,
      },
      async () => {
        await historyStore?.save(request.conversationId, mainResp.messages);
      }
    );
    return mainResp.text;
  }
);

ai.startFlowServer({
  flows: [chatbotFlow],
  cors: {
    origin: '*',
  },
});