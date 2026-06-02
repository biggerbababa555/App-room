"use client";

import Image from "next/image";
import { AgentInfo } from "@/app/page";
import AgentCharacter from "./AgentCharacter";

interface Props {
  agents: AgentInfo[];
  onAgentClick: (agent: AgentInfo) => void;
  activeAgentId?: string;
}

export default function InteractiveMap({ agents, onAgentClick, activeAgentId }: Props) {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/map/App-room.png"
        alt="Office Map"
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />

      {/* Agents layer */}
      <div className="absolute inset-0">
        {agents.map((agent) => (
          <AgentCharacter
            key={agent.id}
            agent={agent}
            onClick={() => onAgentClick(agent)}
            isActive={activeAgentId === agent.id}
          />
        ))}
      </div>
    </div>
  );
}
