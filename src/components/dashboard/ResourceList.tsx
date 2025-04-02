
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Resource = {
  id: string;
  name: string;
  type: string;
  status: "running" | "stopped" | "provisioning" | "error";
  region: string;
  created: string;
  usage?: {
    cpu: number;
    memory: number;
    storage: number;
  };
};

type ResourceListProps = {
  title: string;
  resources: Resource[];
};

export function ResourceList({ title, resources }: ResourceListProps) {
  const getStatusColor = (status: Resource["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-gray-500";
      case "provisioning":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Resource["status"]) => {
    switch (status) {
      case "running":
        return "Running";
      case "stopped":
        return "Stopped";
      case "provisioning":
        return "Provisioning";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Region</TableHead>
              {resources[0]?.usage && (
                <>
                  <TableHead>CPU</TableHead>
                  <TableHead>Memory</TableHead>
                </>
              )}
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", getStatusColor(resource.status))} />
                    <span>{getStatusText(resource.status)}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{resource.region}</Badge></TableCell>
                {resource.usage && (
                  <>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{resource.usage.cpu}%</span>
                        {resource.usage.cpu > 80 ? (
                          <ArrowUp className="h-3 w-3 text-red-500" />
                        ) : resource.usage.cpu < 20 ? (
                          <ArrowDown className="h-3 w-3 text-green-500" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{resource.usage.memory}%</span>
                        {resource.usage.memory > 80 ? (
                          <ArrowUp className="h-3 w-3 text-red-500" />
                        ) : resource.usage.memory < 20 ? (
                          <ArrowDown className="h-3 w-3 text-green-500" />
                        ) : null}
                      </div>
                    </TableCell>
                  </>
                )}
                <TableCell className="text-muted-foreground">{resource.created}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Start</DropdownMenuItem>
                      <DropdownMenuItem>Stop</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
