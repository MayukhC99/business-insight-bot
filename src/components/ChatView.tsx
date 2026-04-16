import { useRef, useEffect, useState, useCallback } from "react";
import { ChatMessage, TypingIndicator, type MessageType } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { EmptyState, type Mode } from "./EmptyState";

// Simulated AI responses
const PM_RESPONSE = `I now have all the critical data needed. Let me compile the full analysis.

---

# 🔍 Roblox Gift Card Conversion Drop — Full Product Intelligence Report

---

## 📊 1. Product Performance & Conversion Trends

### 🚨 The Core Finding: \`buy_disabled = 1\` Across ALL Roblox Brands

| Brand Code | Active? | Buy Disabled | Storefront Enabled | Last Updated |
|---|---|---|---|---|
| **ROBLOX** (US) | ✅ Yes | 🔴 **YES** | ✅ Yes | Feb 27, 2025 |
| **ROBLOXCA** (Canada) | ✅ Yes | 🔴 **YES** | ✅ Yes | Sep 12, 2023 |
| **ROBLOXUK** (UK) | ❌ No | 🔴 **YES** | ✅ Yes | Sep 12, 2023 |

> **This is the smoking gun.** The \`buy_disabled\` flag is set to \`1\` on all three Roblox brand configurations. The storefront is visible and browsable, but purchasing is completely blocked at the platform level. Users can see the product but cannot buy it — a silent conversion killer.

---

### 📉 Conversion Rate Trend (Last 30 Days — Consumer Channel)

| Period | Conversion Rate | Pattern |
|---|---|---|
| **Feb 17–25, 2026** | 75% – 100% | ✅ Healthy baseline |
| **Mar 3–4, 2026** | 50% – 100% | ⚠️ Sporadic success |
| **Mar 6 – Apr 15, 2026** | **0% (100% SERR)** | 🔴 Complete collapse |

> **Conversion has been at 0% for 6+ consecutive weeks.** Every single order attempt is resulting in a \`SERR\` (System Error) status. This is not a gradual decline — it is a hard stop.

### Overall Platform Health (Consumer Channel)
- **Total Orders Processed:** 133,575
- **Historical Completion Rate:** 90.42% (strong baseline)
- **System Errors (SERR):** 6,702 (~5% historically)
- **Current SERR Rate:** **100%** — a catastrophic departure from the norm

---

## 👥 2. Funnel Drop-Off Analysis

The funnel breakdown tells a clear story:

\`\`\`
[User Browses Roblox Gift Card]  ✅ Storefront visible
         ↓
[User Clicks "Buy"]              🔴 buy_disabled = 1 → BLOCKED or silently fails
         ↓
[Order Initiated]                ⚠️ Some orders still reach CONSUMER pipeline
         ↓
[Order Processing]               🔴 100% SERR — System Error at fulfillment
         ↓
[Completion / Activation]        ❌ 0% conversion — No orders completing
\`\`\`

**Drop-off is happening at TWO critical points:**
1. **Pre-purchase:** \`buy_disabled = 1\` prevents the buy flow from completing for most users
2. **Post-initiation:** Any orders that do enter the pipeline hit a \`SERR\` (system error), likely due to a downstream fulfillment or activation failure

**Cart Event Log Signal:**
- \`STATUS_UPDATED\` events: 343 successes vs. **46 failures** (~11.8% failure rate) in the last 60 days — confirming active order processing failures at the status update layer

---

## 🌐 3. External Signals — Market Issues & Sentiment

### 🔴 Roblox Platform Outage (Oct 19–20, 2025)
> *"Players are prevented from launching any game, partying up with their friends, **sending gift cards**, and completing microtransactions."* — Multiple sources, Oct 20, 2025

- A **major platform-wide outage** hit Roblox on **October 19–20, 2025**, affecting 3 core components including gift card transactions
- DownDetector showed a surge of reports at **10:42 AM EST on Oct 19**
- The outage impacted gift card sending, microtransactions, and game access globally

### 🔴 Microsoft Rewards Roblox Gift Card Removal (April 2026)
> *"A growing number of Microsoft Rewards users are raising questions as the Robux gift card option vanishes from their accounts... confirmed on April 1, 2026."*

- Roblox gift cards were **removed from Microsoft Rewards** as of April 1, 2026
- This signals a **broader partner ecosystem disruption** — Roblox may be pulling back from third-party gift card distribution channels
- User complaints spiked on Reddit and Microsoft Q&A forums

### 📈 Gift Card Market Context
- Global gift card market valued at **$1.4 trillion in 2025**, growing at 5.11% CAGR
- Digital gift cards are the fastest-growing segment — making Roblox's absence from our platform especially costly
- Roblox's core demographic (Gen Z, ages 9–17) is highly active in digital gifting

---

## 🔍 4. Root Cause Analysis

There are **three compounding root causes** driving the conversion collapse:

### 🔴 Root Cause #1: \`buy_disabled = 1\` — Platform-Level Purchase Block
The \`buy_disabled\` flag was set on the US Roblox brand as recently as **February 27, 2025**. This is a deliberate configuration change that blocks all purchase flows.

### 🔴 Root Cause #2: 100% SERR Rate Since Early March 2026
Even when orders enter the pipeline, they are all failing with \`SERR\` (System Error). This points to a **broken downstream integration**.

### 🟡 Root Cause #3: External Partner Ecosystem Disruption
Roblox's removal from Microsoft Rewards (April 2026) suggests the brand may be **renegotiating or exiting third-party distribution agreements**.

---

## 🚀 5. Opportunities

| Opportunity | Impact | Effort |
|---|---|---|
| Re-enable \`buy_disabled\` once integration is fixed | 🔴 Critical — restores all revenue | Low (config change) |
| Fix SERR root cause (API/inventory) | 🔴 Critical — unblocks fulfillment | Medium |
| Add real-time brand health monitoring | 🟠 High — prevents silent failures | Medium |
| Surface user-facing messaging when brand is unavailable | 🟡 Medium — reduces frustration | Low |
| Explore Roblox direct partnership renegotiation | 🟠 High — secures long-term supply | High |
| Capture demand via waitlist/notify-me feature | 🟡 Medium — retains intent | Low |

---

## 💡 6. Product Recommendations

### 🔧 Immediate Actions (This Week)

1. **🚨 Investigate & Re-enable \`buy_disabled\`**
2. **🔧 Debug the SERR Pipeline**
3. **📢 Add User-Facing "Temporarily Unavailable" Messaging**

### 📈 Short-Term (Next 2–4 Weeks)

4. **🔔 Build a Brand Health Monitoring Dashboard**
5. **📦 Audit Roblox Inventory & Fulfillment SLA**

### 🤝 Strategic (Next Quarter)

6. **🤝 Renegotiate Roblox Partnership Terms**
7. **🌍 Evaluate UK/CA Market Re-entry**

---

### 📌 Executive Summary

> **The Roblox conversion drop is not a gradual trend — it is a complete, platform-level shutdown.** \`buy_disabled = 1\` is blocking all purchases, and 100% of orders that do enter the pipeline are failing with system errors. This has been silently costing revenue for 6+ weeks. The fix requires both a technical resolution (SERR debugging + re-enabling buy) and a strategic conversation with the Roblox partnership team.`;

const defaultResponse = "I've analyzed the available data sources. Here's what I found:\n\n📊 Revenue is trending upward with a 12% increase month-over-month.\n\n💡 Consider focusing on the enterprise segment — it shows the highest conversion rate at 34%.\n\n🚀 There's an untapped opportunity in the APAC region where competitor presence is minimal.";

function getResponse(_input: string, mode: Mode | null): { content: string; category?: MessageType["category"] } {
  if (mode === "product_manager") {
    return { content: PM_RESPONSE, category: "analytics" };
  }
  return { content: defaultResponse };
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
        const response = getResponse(content, selectedMode);
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
