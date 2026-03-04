// Un seul modèle : DeepSeek (mais sans le nom)
export const DEFAULT_CHAT_MODEL = "default-chat-model";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "default-chat-model",
    name: "Assistant",
    provider: "default",
    description: "Modèle par défaut",
  },
];

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
