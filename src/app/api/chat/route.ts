import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { AGENT_PROMPTS } from "@/lib/agent-prompts";

export async function POST(req: Request) {
  try {
    const { messages, agentId } = await req.json();

    if (!agentId) {
      return new Response("Missing agentId", { status: 400 });
    }

    const systemPrompt = AGENT_PROMPTS[agentId] || 
      "You are a helpful AI assistant in an 8-bit virtual office. Keep your answers concise.";

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages,
    });

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response("Chat API Error: " + (error.stack || error.message || error), { status: 500 });
  }
}
