import Image from "next/image";
import { AgentInfo } from "@/app/page";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  agent: AgentInfo;
  onClick: () => void;
  isActive: boolean;
}

type ActionState = "stand" | "walk" | "run";

export default function AgentCharacter({ agent, onClick, isActive }: Props) {
  const [pos, setPos] = useState({ x: agent.position.x, y: agent.position.y });
  const [action, setAction] = useState<ActionState>("stand");
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    // If agent is active (chatting), force them to stand still
    if (isActive) {
      setAction("stand");
      return;
    }

    const interval = setInterval(() => {
      // Randomly decide next action
      const rand = Math.random();
      let nextAction: ActionState = "stand";
      if (rand > 0.6) nextAction = "run";
      else if (rand > 0.3) nextAction = "walk";

      setAction(nextAction);

      if (nextAction !== "stand") {
        // Random direction
        const dirX = (Math.random() - 0.5) * 2; 
        const dirY = (Math.random() - 0.5) * 2;
        
        // Face the direction of movement
        if (dirX > 0) setDirection(1);
        else if (dirX < 0) setDirection(-1);

        const speed = nextAction === "run" ? 15 : 6;

        setPos(prev => {
          // Keep within screen bounds (10% to 90%)
          const newX = Math.max(10, Math.min(90, prev.x + dirX * speed));
          const newY = Math.max(10, Math.min(90, prev.y + dirY * speed));
          return { x: newX, y: newY };
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  let imageSrc = agent.imageSrc; 
  if (action === "walk") imageSrc = "/character/Big/big-walk.png";
  if (action === "run") imageSrc = "/character/Big/big-run.png";
  if (action === "stand") imageSrc = "/character/Big/big-stand.png";

  return (
    <motion.div
      className="absolute cursor-pointer group flex flex-col items-center"
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        x: "-50%",
        y: "-50%",
      }}
      transition={{ duration: action === "stand" ? 0 : 1.5, ease: "linear" }}
      onClick={onClick}
    >
      {/* Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-16 bg-zinc-800 text-white p-2 rounded-none border-2 border-zinc-400 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 text-[10px]">
        <p className="text-green-400 mb-1">{agent.name}</p>
        <p className="text-zinc-300">{agent.department}</p>
      </div>

      {/* Character Image */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-24 h-24 ${isActive ? "drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" : ""}`}
        style={{ transform: `scaleX(${direction})` }}
      >
        <Image
          src={imageSrc}
          alt={agent.name}
          fill
          className="object-contain drop-shadow-xl"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>
    </motion.div>
  );
}
