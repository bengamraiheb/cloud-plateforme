
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import React from "react";
import { TopNav } from "@/components/layout/TopNav";
import { ChatbotAssistant } from "@/components/chatbot/ChatbotAssistant";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <TopNav />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
        <ChatbotAssistant />
      </div>
    </SidebarProvider>
  );
}
