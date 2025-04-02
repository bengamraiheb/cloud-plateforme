
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Key, AlertCircle, Clock, FileText, Eye, UserCheck, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type SecurityAlert = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  date: string;
  resolved: boolean;
};

const SecurityPage: React.FC = () => {
  const securityScore = 78;

  const securityAlerts: SecurityAlert[] = [
    {
      id: "alert-01",
      title: "Unusual login activity detected",
      description: "Multiple failed login attempts from IP 192.168.1.45",
      severity: "high",
      date: "2 hours ago",
      resolved: false,
    },
    {
      id: "alert-02",
      title: "Outdated security patches",
      description: "3 compute instances require security updates",
      severity: "medium",
      date: "1 day ago",
      resolved: false,
    },
    {
      id: "alert-03",
      title: "Publicly accessible storage bucket",
      description: "Storage bucket 'user-data' has public read access",
      severity: "critical",
      date: "2 days ago",
      resolved: false,
    },
    {
      id: "alert-04",
      title: "Weak encryption settings",
      description: "TLS 1.0 is enabled on load balancer 'web-lb'",
      severity: "medium",
      date: "3 days ago",
      resolved: true,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground mt-1">
            Manage security settings and monitor alerts
          </p>
        </div>
        <Button className="ml-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Run Security Scan
        </Button>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-4xl font-bold mb-2">{securityScore}/100</div>
              <Progress value={securityScore} className={`h-2 w-full ${getScoreColor(securityScore)}`} />
              <p className="text-sm text-muted-foreground mt-2">
                {securityScore >= 80 
                  ? "Good security posture" 
                  : securityScore >= 60 
                    ? "Needs improvement"
                    : "Critical issues need attention"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="flex gap-3 items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div className="text-4xl font-bold">3</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Active threats requiring attention
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Security Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="flex gap-3 items-center mb-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <div className="text-2xl font-bold">5 days ago</div>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Audit Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Recent security incidents and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`border rounded-md p-4 ${alert.resolved ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)} bg-opacity-20`}>
                      <AlertCircle className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{alert.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                        <Button variant="outline" size="sm">
                          {alert.resolved ? "Resolved" : "Resolve"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
                      <UserCheck className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multi-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Enforce MFA for all users</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full dark:bg-purple-900">
                      <Key className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">API Keys</h3>
                      <p className="text-sm text-muted-foreground">Manage API keys and access tokens</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full dark:bg-amber-900">
                      <Eye className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Login History</h3>
                      <p className="text-sm text-muted-foreground">View login attempts and sessions</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">GDPR Compliance</span>
                  <span className="text-green-500 font-medium">Compliant</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">HIPAA Compliance</span>
                  <span className="text-amber-500 font-medium">Partial</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">SOC 2 Compliance</span>
                  <span className="text-blue-500 font-medium">In Progress</span>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Compliance Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
