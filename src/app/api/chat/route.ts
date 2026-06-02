import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { AGENT_PROMPTS } from "@/lib/agent-prompts";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, agentId } = await req.json();

    if (!agentId) {
      return new Response("Missing agentId", { status: 400 });
    }

    const systemPrompt = AGENT_PROMPTS[agentId] || 
      "You are a helpful AI assistant in an 8-bit virtual office. Keep your answers concise.";

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages,
    });
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
