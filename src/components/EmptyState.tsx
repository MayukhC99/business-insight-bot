import { motion } from "framer-motion";
import { Briefcase, TrendingUp, HeadsetIcon, Check } from "lucide-react";

export type Mode = "product_manager" | "sales" | "support";

export const modeConfig: Record<Mode, { icon: typeof Briefcase; title: string; description: string; colorClass: string; borderColor: string; accentVar: string }> = {
  product_manager: {
    icon: Briefcase,
    title: "Product Manager",
    description: "Track metrics, analyze user behavior & prioritize features",
    colorClass: "text-analytics bg-analytics/10 border-analytics/20",
    borderColor: "border-analytics/50",
    accentVar: "analytics",
  },
  sales: {
    icon: TrendingUp,
    title: "Sales",
    description: "Revenue insights, pipeline analysis & growth opportunities",
    colorClass: "text-suggestion bg-suggestion/10 border-suggestion/20",
    borderColor: "border-suggestion/50",
    accentVar: "suggestion",
  },
  support: {
    icon: HeadsetIcon,
    title: "Support",
    description: "Customer sentiment, ticket trends & resolution insights",
    colorClass: "text-opportunity bg-opportunity/10 border-opportunity/20",
    borderColor: "border-opportunity/50",
    accentVar: "opportunity",
  },
};

const prompts: Record<Mode, string[]> = {
  product_manager: [
    "What features should we prioritize next?",
    "Show me user engagement metrics for this month",
    "Compare product performance across regions",
    "What's our feature adoption rate?",
  ],
  sales: [
    "Why did sales drop last quarter?",
    "What growth opportunities exist in segment B?",
    "Show me the pipeline conversion funnel",
    "Compare revenue across product lines",
  ],
  support: [
    "Summarize customer sentiment from social media",
    "What are the top support ticket categories?",
    "Show me resolution time trends",
    "What's driving negative reviews?",
  ],
};

interface EmptyStateProps {
  onPrompt: (prompt: string) => void;
  selectedMode: Mode | null;
  onSelectMode: (mode: Mode) => void;
}

export function EmptyState({ onPrompt, selectedMode, onSelectMode }: EmptyStateProps) {
  const modes = Object.entries(modeConfig) as [Mode, typeof modeConfig[Mode]][];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-xl"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 animate-pulse-glow">
          <Briefcase size={28} className="text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground tracking-tight font-display">
          Business Assistant
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Turn scattered data into insights, suggestions, and opportunities —
          all through a simple conversation.
        </p>

        {/* Mode Cards */}
        <p className="mt-8 text-xs font-medium text-muted-foreground mb-3">Choose your mode</p>
        <div className="grid grid-cols-3 gap-3">
          {modes.map(([key, m], i) => {
            const isSelected = selectedMode === key;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                onClick={() => onSelectMode(key)}
                className={`relative rounded-xl border p-3 text-left cursor-pointer transition-all ${m.colorClass} ${
                  isSelected ? `ring-2 ring-current scale-[1.03] shadow-lg` : "hover:scale-[1.03]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                )}
                <m.icon size={18} className="mb-1.5" />
                <p className="text-xs font-semibold">{m.title}</p>
                <p className="text-[11px] opacity-70">{m.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Suggested Prompts - show based on selected mode */}
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <p className="text-xs font-medium text-muted-foreground mb-3">
              Try asking
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {prompts[selectedMode].map((p, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => onPrompt(p)}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  {p}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
