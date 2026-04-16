import { useRef, useEffect, useState, useCallback } from "react";
import { ChatMessage, TypingIndicator, type MessageType } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { EmptyState, type Mode } from "./EmptyState";

// Simulated AI responses
const mockResponses: Record<string, { content: string; category?: MessageType["category"] }> = {
  default: {
    content:
      "I've analyzed the available data sources. Here's what I found:\n\n📊 Revenue is trending upward with a 12% increase month-over-month.\n\n💡 Consider focusing on the enterprise segment — it shows the highest conversion rate at 34%.\n\n🚀 There's an untapped opportunity in the APAC region where competitor presence is minimal.",
  },
};

function getResponse(input: string): { content: string; category?: MessageType["category"] } {
  const lower = input.toLowerCase();
  if (lower.includes("sales") || lower.includes("drop") || lower.includes("revenue")) {
    return {
      content:
        "📊 Based on the data analysis:\n\nSales decreased by 8.3% in Q3 compared to Q2. The primary factors were:\n\n1. **Seasonal decline** — historically Q3 shows 5-7% lower engagement\n2. **Competitor launch** — Product X entered the market in July, capturing ~3% market share\n3. **Pricing sensitivity** — Customer surveys indicate price as the #2 concern\n\n💡 **Recommendation:** Consider a targeted Q4 campaign with competitive pricing in the affected segments. The data suggests a 15-20% recovery potential.",
      category: "analytics",
    };
  }
  if (lower.includes("opportunity") || lower.includes("growth") || lower.includes("segment")) {
    return {
      content:
        "🚀 **Opportunity Analysis:**\n\nI've identified 3 high-potential opportunities:\n\n1. **Enterprise Mid-Market** — 240 companies in your ICP haven't been reached. Estimated TAM: $2.4M\n2. **Feature Upsell** — 38% of current users on Basic plan use features available only in Pro. Conversion potential: 12-18%\n3. **Geographic Expansion** — LATAM region shows 3x growth rate with minimal competition\n\n📊 Combined potential revenue impact: **$3.8M annually**",
      category: "opportunity",
    };
  }
  if (lower.includes("compare") || lower.includes("performance") || lower.includes("product")) {
    return {
      content:
        "📊 **Product Performance Comparison:**\n\n| Metric | Product A | Product B | Product C |\n|--------|-----------|-----------|----------|\n| Revenue | $1.2M | $890K | $2.1M |\n| Growth | +15% | +8% | +22% |\n| NPS | 72 | 65 | 81 |\n| Churn | 3.2% | 5.1% | 2.8% |\n\n💡 **Insight:** Product C is your star performer. Consider allocating more resources to scale it.\n\n🚀 **Opportunity:** Product B could benefit from the strategies that drove Product C's success.",
      category: "analytics",
    };
  }
  if (lower.includes("sentiment") || lower.includes("social") || lower.includes("customer")) {
    return {
      content:
        "📊 **Customer Sentiment Analysis:**\n\nScanned 12,400 mentions across Twitter, Reddit, and support tickets:\n\n✅ **Positive (62%)** — Users love the ease of use and onboarding experience\n⚠️ **Neutral (24%)** — Feature requests around reporting and integrations\n❌ **Negative (14%)** — Pain points: load times, mobile experience\n\n💡 **Suggestion:** Prioritize mobile performance improvements — sentiment data shows it's the #1 driver of negative reviews.\n\n🚀 **Opportunity:** Launching a public roadmap could convert 8% of neutral mentions to positive advocacy.",
      category: "suggestion",
    };
  }
  return mockResponses.default;
}

export function ChatView() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [modeLocked, setModeLocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

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
        const response = getResponse(content);
        const aiMsg: MessageType = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
          category: response.category,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1200 + Math.random() * 800);
    },
    [selectedMode, modeLocked]
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
          <div className="mx-auto max-w-3xl py-4">
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
