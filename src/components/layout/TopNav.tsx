
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  return (
    <div className="border-b px-6 py-3 flex items-center justify-between bg-white dark:bg-card">
      <div className="flex items-center gap-4 w-full max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="w-full pl-10 bg-muted/40"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">Storage capacity warning</div>
                <div className="text-sm text-muted-foreground">Object storage usage exceeded 80% threshold</div>
                <div className="text-xs text-muted-foreground">10 minutes ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">VM instance created</div>
                <div className="text-sm text-muted-foreground">web-server-05 is now running</div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">Security update available</div>
                <div className="text-sm text-muted-foreground">Critical update for database service</div>
                <div className="text-xs text-muted-foreground">3 hours ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2 flex justify-center">
              <span className="text-primary text-sm font-medium">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Demo Organization</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch tenant</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Demo Organization</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Acme Corp</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Tech Innovators</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
