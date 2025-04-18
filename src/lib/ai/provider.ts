import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';
import { customProvider } from 'ai';
import { env } from '../env';
import axios from 'axios';

const fourLLM = createOpenAI({
  baseURL: 'https://api.4llm.com/v1',
  apiKey: env.FOURLLM_API_KEY,
  compatibility: 'compatible',
});

export const aiRegistery = createProviderRegistry({
  fourLLM,
});

export const aiProvider = customProvider({
  languageModels: {
    'title-model': fourLLM('pone-chat'),
    'core-work': fourLLM('pone-reasoner'),
  },
});

async function testStrictJsonOutput() {
  const response = await axios.post(
    'https://api.4llm.com/v2/completions',
    {
      model: 'pone-chat',
      prompt: 'Return a JSON object with a title and a list of three items.',
      tools: [
        {
          type: 'function',
          function: {
            name: 'return_json',
            description: 'Return a JSON object with a title and a list of three items.',
            parameters: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                items: { type: 'array', items: { type: 'string' } },
              },
              required: ['title', 'items'],
            },
          },
        },
      ],
      tool_choice: { type: 'function', function: { name: 'return_json' } },
    },
    {
      headers: {
        Authorization: `Bearer ${env.FOURLLM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  // Extract and parse the JSON arguments
  const toolCalls = response.data.tool_calls;
  if (toolCalls && toolCalls.length > 0) {
    const args = JSON.parse(toolCalls[0].function.arguments);
    console.log('Strict JSON output:', args);
  } else {
    console.log('No tool_calls found:', response.data);
  }
}

testStrictJsonOutput();
