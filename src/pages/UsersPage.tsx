
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, Key, Lock, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "readonly";
  status: "active" | "inactive" | "pending";
  lastActive: string;
  avatar?: string;
};

type Role = {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
};

const UsersPage: React.FC = () => {
  const users: User[] = [
    {
      id: "user-01",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "user-02",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: "user-03",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "readonly",
      status: "inactive",
      lastActive: "2 weeks ago",
    },
    {
      id: "user-04",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "user",
      status: "pending",
      lastActive: "Never",
    },
  ];

  const roles: Role[] = [
    {
      id: "role-01",
      name: "Administrator",
      description: "Full access to all resources",
      userCount: 1,
      permissions: ["Create", "Read", "Update", "Delete", "Manage Users"],
    },
    {
      id: "role-02",
      name: "User",
      description: "Standard access to resources",
      userCount: 2,
      permissions: ["Create", "Read", "Update"],
    },
    {
      id: "role-03",
      name: "Read Only",
      description: "View-only access",
      userCount: 1,
      permissions: ["Read"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-gray-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500 text-white";
      case "user":
        return "bg-blue-500 text-white";
      case "readonly":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users & Access</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button className="ml-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {users.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">{user.lastActive}</td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="icon">
                              <Key className="h-4 w-4" />
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

        <Card className="mb-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Roles & Permissions</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Role
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{role.userCount} users</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {role.permissions.map((permission, idx) => (
                      <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
