import { AgentInfo } from "@/app/page";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  agent: AgentInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ agent, isOpen, onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], agentId: agent?.id }),
      });
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botContent = "";
      const botId = (Date.now() + 1).toString();
      
      setMessages((prev) => [...prev, { id: botId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { id: botId, role: "assistant", content: botContent };
          return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Clear chat when switching agent
  useEffect(() => {
    setMessages([]);
  }, [agent?.id, setMessages]);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && agent && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed top-0 right-0 w-80 h-full bg-zinc-900 border-l-4 border-zinc-700 shadow-[-8px_0_0_0_rgba(0,0,0,0.5)] flex flex-col z-50 text-xs"
        >
          {/* Header */}
          <div className="bg-zinc-800 p-4 border-b-4 border-zinc-700 flex justify-between items-center">
            <div>
              <h2 className="text-green-400 mb-1">{agent.name}</h2>
              <p className="text-[8px] text-zinc-400">{agent.department}</p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              [X]
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-zinc-500 text-center mt-10 leading-loose">
                Connected to {agent.name}...<br />
                Say hi!
              </div>
            )}
            
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[8px] text-zinc-500 mb-1">
                  {m.role === "user" ? "YOU" : agent.name.toUpperCase()}
                </span>
                <div
                  className={`p-3 max-w-[90%] leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                      : "bg-zinc-700 text-zinc-100 rounded-r-lg rounded-bl-lg"
                  }`}
                  style={{
                    boxShadow: m.role === "user" 
                      ? "-2px 2px 0px 0px rgba(0,0,0,0.5)" 
                      : "2px 2px 0px 0px rgba(0,0,0,0.5)"
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-zinc-800 border-t-4 border-zinc-700">
            <form onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }} className="flex flex-col gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-zinc-900 border-2 border-zinc-600 p-2 text-white outline-none focus:border-green-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white p-2 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
              >
                SEND
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
