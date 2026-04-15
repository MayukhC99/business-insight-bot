import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ChatSidebar, type Conversation } from "../components/ChatSidebar";
import { ChatView } from "../components/ChatView";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Business Assistant — AI-Powered Insights" },
      {
        name: "description",
        content:
          "Turn scattered data into insights, suggestions, and opportunities through a simple conversation.",
      },
    ],
  }),
});

function Index() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Q3 Sales Analysis",
      timestamp: new Date(),
      type: "analytics",
    },
    {
      id: "2",
      title: "Growth Opportunities",
      timestamp: new Date(),
      type: "opportunity",
    },
    {
      id: "3",
      title: "Product Improvements",
      timestamp: new Date(),
      type: "suggestion",
    },
  ]);
  const [activeId, setActiveId] = useState<string | null>("1");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNew = useCallback(() => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "New Conversation",
      timestamp: new Date(),
      type: "general",
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) {
        setActiveId(null);
      }
    },
    [activeId]
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={handleNew}
        onDelete={handleDelete}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((p) => !p)}
      />
      <main className="flex flex-1 flex-col overflow-hidden">
        <ChatView />
      </main>
    </div>
  );
}
