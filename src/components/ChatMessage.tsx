import { motion } from "framer-motion";
import {
  BarChart3,
  Lightbulb,
  Rocket,
  Bot,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: "analytics" | "suggestion" | "opportunity";
};

const categoryConfig = {
  analytics: {
    icon: BarChart3,
    label: "Analytics",
    className: "bg-analytics/10 text-analytics border-analytics/20",
  },
  suggestion: {
    icon: Lightbulb,
    label: "Suggestion",
    className: "bg-suggestion/10 text-suggestion border-suggestion/20",
  },
  opportunity: {
    icon: Rocket,
    label: "Opportunity",
    className: "bg-opportunity/10 text-opportunity border-opportunity/20",
  },
};

export function ChatMessage({ message }: { message: MessageType }) {
  const isUser = message.role === "user";
  const cat = message.category ? categoryConfig[message.category] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 px-4 py-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary/15 text-primary"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Content */}
      <div className={`flex-1 max-w-[75%] ${isUser ? "text-right" : ""}`}>
        {cat && (
          <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium mb-2 ${cat.className}`}>
            <cat.icon size={12} />
            {cat.label}
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card text-card-foreground border border-border rounded-tl-sm"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 px-4 py-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Bot size={16} />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-muted-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
