import { openai } from "@/lib/clients/openai";

export async function generateOpenAIResponse(
  prompt: string,
  functionCall: () => void,
  aiModel: string,
  systemMessage?: string
): Promise<any> {
  try {
    console.log("Generated Prompt: ", prompt);

    const messages: any[] = [
      {
        role: "system",
        content: systemMessage || "You are a helpful assistant. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const tools: any[] = [
      {
        type: "function",
        function: functionCall,
      },
    ];

    const response = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
      tools: tools,
      tool_choice: { type: "function", function: { name: functionCall.name } },
    });

    return response;
  } catch (error) {
    console.error("Error with OpenAI request: ", error);
    throw error;
  }
}
