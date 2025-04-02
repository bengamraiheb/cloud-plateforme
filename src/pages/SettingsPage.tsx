
import React from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BellRing, CreditCard, Globe, Mail, Save, Shield, User } from "lucide-react";

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage account settings and preferences
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="System Administrator" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compact Mode</h4>
                      <p className="text-sm text-muted-foreground">Use compact view for tables and lists</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">Set the idle time before session expires</p>
                    </div>
                    <div className="w-32">
                      <Input type="number" defaultValue="30" min="5" max="60" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Security Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications about security incidents</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Resource Status Changes</h4>
                      <p className="text-sm text-muted-foreground">Get notified when resource status changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Billing Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about billing and usage</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Marketing Updates</h4>
                      <p className="text-sm text-muted-foreground">Receive newsletters and feature updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Delivery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-email">Primary Email</Label>
                    <Input id="primary-email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-email">Secondary Email (Optional)</Label>
                    <Input id="secondary-email" type="email" placeholder="Enter a secondary email" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage billing and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-sm text-muted-foreground">Business Pro - $49.99/month</p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <Button variant="outline" className="mt-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Billing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" defaultValue="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-line2">Address Line 2</Label>
                    <Input id="address-line2" defaultValue="Suite 100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" defaultValue="California" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input id="zip" defaultValue="94103" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="United States" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button className="mt-2">
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
                <Button variant="outline" disabled className="mt-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Set Up Two-Factor Authentication
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Login Sessions</h3>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium">Current Session</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>IP Address: 192.168.1.100</p>
                    <p>Location: San Francisco, CA, United States</p>
                    <p>Device: Chrome on MacOS</p>
                    <p>Started: 2 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  Sign Out All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">API Keys</h3>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Production API Key</h4>
                      <p className="text-sm text-muted-foreground">Created on Oct 15, 2023</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Show</Button>
                      <Button variant="outline" size="sm" className="text-red-500">Revoke</Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Development API Key</h4>
                      <p className="text-sm text-muted-foreground">Created on Oct 20, 2023</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Show</Button>
                      <Button variant="outline" size="sm" className="text-red-500">Revoke</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">API Access Control</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Restrict API Access by IP</h4>
                      <p className="text-sm text-muted-foreground">Only allow API calls from specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <Input id="ip-whitelist" disabled placeholder="e.g., 192.168.1.1, 10.0.0.1" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Webhook Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://example.com/webhook" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-medium">Enable Webhooks</h4>
                    <p className="text-sm text-muted-foreground">Send event notifications to webhook URL</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
