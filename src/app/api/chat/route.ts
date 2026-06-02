import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages, agentId } = await req.json();

    if (!agentId) {
      return new Response("Missing agentId", { status: 400 });
    }

    // Read the agent's skill.md file
    let systemPrompt = "";
    try {
      const filePath = path.join(process.cwd(), "agents", `${agentId}-agent.md`);
      systemPrompt = await fs.readFile(filePath, "utf-8");
    } catch (err) {
      console.warn(`Could not find skill file for agent ${agentId}. Using default.`);
      systemPrompt = "You are a helpful AI assistant in an 8-bit virtual office. Keep your answers concise.";
    }

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
