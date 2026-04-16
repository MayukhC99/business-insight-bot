import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import type { Mode } from "./EmptyState";
import { modeConfig } from "./EmptyState";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  mode: Mode | null;
}

const modeStyles: Record<string, { border: string; focusBorder: string; glow: string; text: string; bg: string }> = {
  product_manager: {
    border: "border-analytics/50",
    focusBorder: "focus-within:border-analytics",
    glow: "focus-within:glow-analytics",
    text: "text-analytics",
    bg: "bg-analytics",
  },
  sales: {
    border: "border-suggestion/50",
    focusBorder: "focus-within:border-suggestion",
    glow: "focus-within:glow-suggestion",
    text: "text-suggestion",
    bg: "bg-suggestion",
  },
  support: {
    border: "border-opportunity/50",
    focusBorder: "focus-within:border-opportunity",
    glow: "focus-within:glow-opportunity",
    text: "text-opportunity",
    bg: "bg-opportunity",
  },
};

export function ChatInput({ onSend, disabled, mode }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const styles = mode ? modeStyles[mode] : null;
  const borderClass = styles
    ? `${styles.border} ${styles.focusBorder} ${styles.glow}`
    : "border-border focus-within:border-primary/50 focus-within:glow-primary";

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="mx-auto max-w-3xl">
        {mode && styles && (
          <div className="flex items-center gap-1.5 mb-2 ml-1">
            {(() => {
              const Icon = modeConfig[mode].icon;
              return <Icon size={12} className={styles.text} />;
            })()}
            <span className={`text-[11px] font-medium ${styles.text}`}>
              Mode: {modeConfig[mode].title}
            </span>
          </div>
        )}
        <div className={`flex items-end gap-2 rounded-2xl border bg-card p-2 transition-colors ${borderClass}`}>
          <button
            className="mb-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Attach file"
          >
            <Paperclip size={18} />
          </button>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode ? `Ask as ${modeConfig[mode].title}...` : "Select a mode to start..."}
            disabled={disabled || !mode}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 py-2"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!value.trim() || disabled || !mode}
            className={`mb-1 flex h-9 w-9 items-center justify-center rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              styles
                ? `${styles.bg} text-white hover:opacity-90`
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <Send size={16} />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          AI Business Assistant · Analytics · Suggestions · Opportunities
        </p>
      </div>
    </div>
  );
}
