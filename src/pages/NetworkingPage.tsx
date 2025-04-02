
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, ExternalLink, Shield, Globe } from "lucide-react";

type Network = {
  id: string;
  name: string;
  type: "vpc" | "subnet" | "load-balancer" | "firewall";
  region: string;
  status: "active" | "pending" | "error";
  created: string;
  details: {
    cidr?: string;
    connectedResources?: number;
    protocol?: string;
    availability?: string;
  };
};

const NetworkingPage: React.FC = () => {
  const networks: Network[] = [
    {
      id: "vpc-01",
      name: "Production VPC",
      type: "vpc",
      region: "us-west-1",
      status: "active",
      created: "2023-08-15",
      details: {
        cidr: "10.0.0.0/16",
        connectedResources: 12,
      },
    },
    {
      id: "sn-01",
      name: "Web Subnet",
      type: "subnet",
      region: "us-west-1",
      status: "active",
      created: "2023-08-16",
      details: {
        cidr: "10.0.1.0/24",
        connectedResources: 5,
      },
    },
    {
      id: "lb-01",
      name: "Web Load Balancer",
      type: "load-balancer",
      region: "us-west-1",
      status: "active",
      created: "2023-09-10",
      details: {
        protocol: "HTTPS",
        availability: "High",
        connectedResources: 3,
      },
    },
    {
      id: "fw-01",
      name: "External Firewall",
      type: "firewall",
      region: "us-west-1",
      status: "active",
      created: "2023-09-12",
      details: {
        connectedResources: 2,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vpc":
        return <Globe className="h-4 w-4" />;
      case "subnet":
        return <ExternalLink className="h-4 w-4" />;
      case "load-balancer":
        return <Shield className="h-4 w-4" />;
      case "firewall":
        return <Shield className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Networking</h1>
          <p className="text-muted-foreground mt-1">
            Manage your VPCs, subnets, and networking resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New VPC
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Resource
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Network Resources</CardTitle>
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
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Details</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {networks.map((network) => (
                    <tr key={network.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{network.name}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <span className="mr-2">{getTypeIcon(network.type)}</span>
                          <span className="capitalize">{network.type}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{network.region}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(network.status)}`}>
                          {network.status}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs text-muted-foreground">
                          {network.details.cidr && <div>CIDR: {network.details.cidr}</div>}
                          {network.details.protocol && <div>Protocol: {network.details.protocol}</div>}
                          {network.details.availability && <div>Availability: {network.details.availability}</div>}
                          <div>Resources: {network.details.connectedResources}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{network.created}</td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Manage
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

export default NetworkingPage;
