
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import React from "react";
import { TopNav } from "@/components/layout/TopNav";
import { ChatbotAssistant } from "@/components/chatbot/ChatbotAssistant";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-background/90">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <TopNav />
          <main className="flex-1 p-6 overflow-auto backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        <ChatbotAssistant />
      </div>
    </SidebarProvider>
  );
}
