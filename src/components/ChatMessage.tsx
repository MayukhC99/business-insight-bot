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
      <div className={`flex-1 ${isUser ? "max-w-[75%] text-right" : "max-w-full"}`}>
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
          <div className="prose prose-sm dark:prose-invert max-w-none
            [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border
            [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:pb-1.5 [&_h2]:border-b [&_h2]:border-border/50
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1.5
            [&_hr]:my-4 [&_hr]:border-border/40
            [&_table]:w-full [&_table]:text-xs [&_table]:my-3 [&_table]:border-collapse
            [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted/50 [&_th]:border [&_th]:border-border
            [&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-border
            [&_blockquote]:border-l-2 [&_blockquote]:border-l-primary/40 [&_blockquote]:bg-muted/30 [&_blockquote]:rounded-r-lg [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:my-3 [&_blockquote]:text-[13px] [&_blockquote]:italic
            [&_code]:text-[12px] [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
            [&_pre]:bg-muted [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0
            [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5
            [&_strong]:font-semibold
            [&_p]:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
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
