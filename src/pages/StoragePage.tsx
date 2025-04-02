
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download, Upload, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type StorageBucket = {
  id: string;
  name: string;
  type: string;
  region: string;
  created: string;
  size: {
    used: number;
    total: number;
  };
  access: "public" | "private" | "restricted";
};

const StoragePage: React.FC = () => {
  const storageBuckets: StorageBucket[] = [
    {
      id: "bucket-01",
      name: "app-assets",
      type: "Standard",
      region: "us-west-1",
      created: "2023-09-15",
      size: {
        used: 120,
        total: 500,
      },
      access: "public",
    },
    {
      id: "bucket-02",
      name: "user-uploads",
      type: "Standard",
      region: "us-west-1",
      created: "2023-08-22",
      size: {
        used: 350,
        total: 1000,
      },
      access: "private",
    },
    {
      id: "bucket-03",
      name: "database-backups",
      type: "Archive",
      region: "eu-central-1",
      created: "2023-07-10",
      size: {
        used: 75,
        total: 200,
      },
      access: "private",
    },
    {
      id: "bucket-04",
      name: "logs-archive",
      type: "Cold Storage",
      region: "ap-southeast-1",
      created: "2023-05-18",
      size: {
        used: 180,
        total: 500,
      },
      access: "restricted",
    },
  ];

  const getAccessBadgeColor = (access: string) => {
    switch (access) {
      case "public":
        return "bg-emerald-500 text-white";
      case "private":
        return "bg-blue-500 text-white";
      case "restricted":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage</h1>
          <p className="text-muted-foreground mt-1">
            Manage your storage buckets and files
          </p>
        </div>
        <Button className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Bucket
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Storage Buckets</CardTitle>
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
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Access</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Usage</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {storageBuckets.map((bucket) => (
                    <tr key={bucket.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{bucket.name}</td>
                      <td className="p-4 align-middle">{bucket.type}</td>
                      <td className="p-4 align-middle">{bucket.region}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessBadgeColor(bucket.access)}`}>
                          {bucket.access}
                        </span>
                      </td>
                      <td className="p-4 align-middle w-40">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>{bucket.size.used} GB</span>
                            <span>{bucket.size.total} GB</span>
                          </div>
                          <Progress value={(bucket.size.used / bucket.size.total) * 100} className="h-2" />
                        </div>
                      </td>
                      <td className="p-4 align-middle">{bucket.created}</td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
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

export default StoragePage;
