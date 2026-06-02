"use client";

import Image from "next/image";
import { AgentInfo } from "@/app/page";
import AgentCharacter from "./AgentCharacter";

interface Props {
  agents: AgentInfo[];
  onAgentClick: (agent: AgentInfo) => void;
  activeAgentId?: string;
}

export default function InteractiveMap({
  agents,
  onAgentClick,
  activeAgentId,
}: Props) {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/map/room-app.png"
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
      {/* Static Characters Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Olaf - Bottom Left TV */}
        <a
          href="https://b6g.boonthavorn.com/apps/meeting-room/view?room_id=18dd4982-ff0a-41cc-9fc9-61e74977638e"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
          style={{ top: "67%", left: "15.4%" }}
          title="Meeting Room - Olaf"
        >
          <div className="relative w-16 h-16">
            <Image src="/olaf.png" alt="Olaf" fill className="object-contain" />
          </div>
        </a>

        {/* Penguin - Top Left TV */}
        <a
          href="https://b6g.boonthavorn.com/apps/meeting-room/view?room_id=1b263c10-4fe5-4dda-aeed-d5fdd75864cd"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
          style={{ top: "24%", left: "15.4%" }}
          title="Meeting Room - Penguin"
        >
          <div className="relative w-16 h-16">
            <Image
              src="/penguin.png"
              alt="Penguin"
              fill
              className="object-contain"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
