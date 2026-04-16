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

  const modeAccent = mode ? modeConfig[mode].accentVar : null;
  const borderClass = mode
    ? `border-${modeAccent}/50 focus-within:border-${modeAccent} focus-within:glow-${modeAccent}`
    : "border-border focus-within:border-primary/50 focus-within:glow-primary";

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="mx-auto max-w-3xl">
        {mode && (
          <div className="flex items-center gap-1.5 mb-2 ml-1">
            {(() => {
              const Icon = modeConfig[mode].icon;
              return <Icon size={12} className={`text-${modeAccent}`} />;
            })()}
            <span className={`text-[11px] font-medium text-${modeAccent}`}>
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
              mode
                ? `bg-${modeAccent} text-white hover:opacity-90`
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
