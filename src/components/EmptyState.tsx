import { motion } from "framer-motion";
import { BarChart3, Lightbulb, Rocket, Database } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Real-time metrics and trend analysis",
    colorClass: "text-analytics bg-analytics/10 border-analytics/20",
    glowClass: "glow-analytics",
  },
  {
    icon: Lightbulb,
    title: "Suggestions",
    description: "Actionable recommendations for growth",
    colorClass: "text-suggestion bg-suggestion/10 border-suggestion/20",
    glowClass: "glow-suggestion",
  },
  {
    icon: Rocket,
    title: "Opportunities",
    description: "Discover untapped segments & potential",
    colorClass: "text-opportunity bg-opportunity/10 border-opportunity/20",
    glowClass: "glow-opportunity",
  },
  {
    icon: Database,
    title: "Unified Data",
    description: "Connect databases, social & internal tools",
    colorClass: "text-primary bg-primary/10 border-primary/20",
    glowClass: "glow-primary",
  },
];

const prompts = [
  "Why did sales drop last quarter?",
  "Compare product performance across regions",
  "What growth opportunities exist in segment B?",
  "Summarize customer sentiment from social media",
];

interface EmptyStateProps {
  onPrompt: (prompt: string) => void;
}

export function EmptyState({ onPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-xl"
      >
        {/* Logo mark */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 animate-pulse-glow">
          <BarChart3 size={28} className="text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground tracking-tight font-display">
          Business Assistant
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Turn scattered data into insights, suggestions, and opportunities —
          all through a simple conversation.
        </p>

        {/* Feature Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              className={`rounded-xl border p-3 text-left ${f.colorClass}`}
            >
              <f.icon size={18} className="mb-1.5" />
              <p className="text-xs font-semibold">{f.title}</p>
              <p className="text-[11px] opacity-70">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="mt-8">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            Try asking
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {prompts.map((p, i) => (
              <motion.button
                key={p}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                onClick={() => onPrompt(p)}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
