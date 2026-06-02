"use client";

import { useState } from "react";
import InteractiveMap from "@/components/InteractiveMap";
import ChatSidebar from "@/components/ChatSidebar";

export type AgentInfo = {
  id: string;
  name: string;
  department: string;
  position: { x: number; y: number };
  imageSrc: string;
};

const AGENTS: AgentInfo[] = [
  {
    id: "big",
    name: "Big",
    department: "Founder",
    position: { x: 50, y: 50 }, // Percentages for center
    imageSrc: "/character/Big/big-stand.png",
  },
];

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<AgentInfo | null>(null);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden select-none">
      <InteractiveMap
        agents={AGENTS}
        onAgentClick={(agent) => setActiveAgent(agent)}
        activeAgentId={activeAgent?.id}
      />

      <ChatSidebar
        agent={activeAgent}
        isOpen={!!activeAgent}
        onClose={() => setActiveAgent(null)}
      />
    </main>
  );
}
