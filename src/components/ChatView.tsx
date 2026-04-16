import { useRef, useState, useCallback } from "react";
import { ChatMessage, TypingIndicator, type MessageType } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { EmptyState, type Mode } from "./EmptyState";
import { getResponse } from "../lib/mockResponses";

interface ChatViewProps {
  chatId?: string;
}

export function ChatView({ chatId }: ChatViewProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [modeLocked, setModeLocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(
    (content: string) => {
      if (!selectedMode) return;
      if (!modeLocked) setModeLocked(true);

      const userMsg: MessageType = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const response = getResponse(content, selectedMode, chatId);
        const aiMsg: MessageType = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
          category: response.category,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);

        // Scroll to just below the user message (top of response), not bottom
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            // Find the last user message element and scroll to it
            const messageElements = scrollRef.current.querySelectorAll('[data-role="user"]');
            const lastUserMsg = messageElements[messageElements.length - 1];
            if (lastUserMsg) {
              lastUserMsg.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        });
      }, 5000);
    },
    [selectedMode, modeLocked, chatId]
  );

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState
            onPrompt={handleSend}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
          />
        ) : (
          <div className="mx-auto max-w-4xl py-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} disabled={isTyping} mode={selectedMode} />
    </div>
  );
}
