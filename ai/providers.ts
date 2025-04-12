import { groq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

const languageModels = {
  "meta-llama/llama-4-scout-17b-16e-instruct": groq(
    "meta-llama/llama-4-scout-17b-16e-instruct"
  ),
  "meta-llama/llama-4-maverick-17b-128e-instruct": groq(
    "meta-llama/llama-4-maverick-17b-128e-instruct"
  ),
  "llama-3.1-8b-instant": groq("llama-3.1-8b-instant"),
  "deepseek-r1-distill-llama-70b": wrapLanguageModel({
    middleware: extractReasoningMiddleware({
      tagName: "think",
    }),
    model: groq("deepseek-r1-distill-llama-70b"),
  }),
  "llama-3.3-70b-versatile": groq("llama-3.3-70b-versatile"),
  "gemma2-9b-it": groq("gemma2-9b-it"),
  "qwen-2.5-coder-32b": groq("qwen-2.5-coder-32b"),
};

export const model = customProvider({
  languageModels,
});

export type modelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels);

export const defaultModel: modelID =
  "meta-llama/llama-4-maverick-17b-128e-instruct";
