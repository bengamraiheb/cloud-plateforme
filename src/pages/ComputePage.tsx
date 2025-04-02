
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Power, RotateCw, Trash } from "lucide-react";

type ComputeInstance = {
  id: string;
  name: string;
  type: string;
  status: "running" | "stopped" | "provisioning" | "error";
  region: string;
  created: string;
  specs: {
    cpu: number;
    memory: number;
    storage: number;
  };
};

const ComputePage: React.FC = () => {
  const computeInstances: ComputeInstance[] = [
    {
      id: "vm-01",
      name: "Web Server",
      type: "Standard-2",
      status: "running",
      region: "us-west-1",
      created: "2023-10-15",
      specs: {
        cpu: 2,
        memory: 4,
        storage: 80,
      },
    },
    {
      id: "vm-02",
      name: "Database Server",
      type: "Performance-4",
      status: "running",
      region: "us-west-1",
      created: "2023-10-10",
      specs: {
        cpu: 4,
        memory: 16,
        storage: 500,
      },
    },
    {
      id: "vm-03",
      name: "Dev Environment",
      type: "Standard-1",
      status: "stopped",
      region: "eu-central-1",
      created: "2023-09-20",
      specs: {
        cpu: 1,
        memory: 2,
        storage: 40,
      },
    },
    {
      id: "vm-04",
      name: "Test Server",
      type: "Standard-2",
      status: "error",
      region: "ap-southeast-1",
      created: "2023-10-18",
      specs: {
        cpu: 2,
        memory: 4,
        storage: 80,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500 text-white";
      case "stopped":
        return "bg-gray-500 text-white";
      case "provisioning":
        return "bg-blue-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compute</h1>
          <p className="text-muted-foreground mt-1">
            Manage your virtual machines and compute resources
          </p>
        </div>
        <Button className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Instance
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Virtual Machines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Region</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Resources</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {computeInstances.map((instance) => (
                    <tr key={instance.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{instance.name}</td>
                      <td className="p-4 align-middle">{instance.type}</td>
                      <td className="p-4 align-middle">{instance.region}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instance.status)}`}>
                          {instance.status}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs text-muted-foreground">
                          <div>{instance.specs.cpu} vCPU</div>
                          <div>{instance.specs.memory} GB RAM</div>
                          <div>{instance.specs.storage} GB Storage</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{instance.created}</td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon">
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <RotateCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ComputePage;
