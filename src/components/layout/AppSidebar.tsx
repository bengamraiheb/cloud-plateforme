
import {
  Cloud,
  Database,
  Layers,
  Server,
  Settings,
  Shield,
  Users,
  Wifi,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Menu items for the sidebar
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Layers,
  },
  {
    title: "Compute",
    url: "/compute",
    icon: Server,
  },
  {
    title: "Storage",
    url: "/storage",
    icon: Database,
  },
  {
    title: "Networking",
    url: "/networking",
    icon: Wifi,
  }
];

const managementItems = [
  {
    title: "Users & Access",
    url: "/users",
    icon: Users,
  },
  {
    title: "Security",
    url: "/security",
    icon: Shield,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-2">
          <Cloud className="h-7 w-7 text-white" />
          <span className="text-xl font-semibold text-white">CloudHaven</span>
        </div>
        <div className="mt-4">
          <SidebarTrigger className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn(
                      window.location.pathname === item.url ? 
                      "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    )}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn(
                      window.location.pathname === item.url ? 
                      "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    )}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center px-4 py-3 mb-2 bg-sidebar-accent rounded-md mx-4">
          <Avatar className="h-8 w-8 mr-2 border border-white/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Administrator</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
