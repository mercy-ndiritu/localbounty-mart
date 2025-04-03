
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Mail, 
  Calendar, 
  Users, 
  Clock,
  Send,
  Megaphone,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Play,
  Pause,
  Clock4,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const MarketingAutomationPage = () => {
  const { subscriptionTier } = useAppContext();
  const [selectedTab, setSelectedTab] = useState('workflows');
  const [activeWorkflows, setActiveWorkflows] = useState(3);
  const [pausedWorkflows, setPausedWorkflows] = useState(2);
  
  // Check if user has premium subscription
  if (subscriptionTier !== 'premium') {
    return (
      <Navigate to="/subscription" replace />
    );
  }

  const handleCreateWorkflow = () => {
    toast({
      title: "Workflow Created",
      description: "Your new marketing workflow has been created."
    });
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "Your new campaign has been scheduled."
    });
  };

  const toggleWorkflowStatus = (id: string, currentStatus: 'active' | 'paused') => {
    if (currentStatus === 'active') {
      setActiveWorkflows(activeWorkflows - 1);
      setPausedWorkflows(pausedWorkflows + 1);
      toast({
        title: "Workflow Paused",
        description: `Workflow #${id} has been paused.`
      });
    } else {
      setActiveWorkflows(activeWorkflows + 1);
      setPausedWorkflows(pausedWorkflows - 1);
      toast({
        title: "Workflow Activated",
        description: `Workflow #${id} is now active.`
      });
    }
  };

  const sampleWorkflows = [
    { 
      id: '1', 
      name: 'Welcome Series', 
      type: 'Email', 
      trigger: 'New Signup', 
      status: 'active' as const,
      steps: 4,
      audience: 'New Customers',
    },
    { 
      id: '2', 
      name: 'Abandoned Cart Recovery', 
      type: 'Email', 
      trigger: 'Cart Abandoned', 
      status: 'active' as const,
      steps: 3,
      audience: 'All Customers',
    },
    { 
      id: '3', 
      name: 'Post-Purchase Follow Up', 
      type: 'Email', 
      trigger: 'Order Completed', 
      status: 'active' as const,
      steps: 2,
      audience: 'Recent Buyers',
    },
    { 
      id: '4', 
      name: 'Re-engagement', 
      type: 'Email', 
      trigger: 'Inactivity (30 days)', 
      status: 'paused' as const,
      steps: 3,
      audience: 'Inactive Customers',
    },
    { 
      id: '5', 
      name: 'Social Media Promotion', 
      type: 'Social', 
      trigger: 'New Product', 
      status: 'paused' as const,
      steps: 2,
      audience: 'Social Followers',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Marketing Automation</h1>
          <p className="text-gray-600">Premium tools to automate your marketing efforts</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Workflows</p>
                <p className="text-2xl font-bold">{activeWorkflows}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paused Workflows</p>
                <p className="text-2xl font-bold">{pausedWorkflows}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Pause className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Scheduled Campaigns</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock4 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Automation Workflows</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>Campaigns</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="social">
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <span>Social Integration</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="mt-6 space-y-6">
          {/* Workflows List */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Workflows</CardTitle>
              <CardDescription>Manage your marketing automation workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleWorkflows.map((workflow) => (
                      <tr key={workflow.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workflow.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workflow.trigger}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workflow.audience}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${workflow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {workflow.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleWorkflowStatus(workflow.id, workflow.status)}
                            >
                              {workflow.status === 'active' ? 'Pause' : 'Activate'}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-500">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Create New Workflow */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Workflow</CardTitle>
              <CardDescription>Set up an automated marketing sequence</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input id="workflow-name" placeholder="e.g. New Customer Welcome Series" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workflow-type">Workflow Type</Label>
                    <Select defaultValue="email">
                      <SelectTrigger id="workflow-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Sequence</SelectItem>
                        <SelectItem value="sms">SMS Sequence</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="multi">Multi-Channel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="workflow-trigger">Trigger Event</Label>
                    <Select defaultValue="signup">
                      <SelectTrigger id="workflow-trigger">
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="signup">New Signup</SelectItem>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="abandoned">Abandoned Cart</SelectItem>
                        <SelectItem value="inactivity">Customer Inactivity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="audience">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                      <SelectItem value="repeat">Repeat Customers</SelectItem>
                      <SelectItem value="inactive">Inactive Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateWorkflow}>Create Workflow</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Create and manage email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g. Summer Sale Promotion" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input id="subject" placeholder="Enter email subject line" />
                  </div>
                  
                  <div>
                    <Label htmlFor="sender">Sender Name</Label>
                    <Input id="sender" placeholder="e.g. Your Brand Name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email-body">Email Content</Label>
                  <textarea 
                    id="email-body"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                    placeholder="Compose your email message here..."
                  ></textarea>
                </div>

                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Input type="date" id="schedule-date" />
                    <Input type="time" id="schedule-time" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-analytics" />
                  <label
                    htmlFor="include-analytics"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Track email analytics (opens, clicks, etc.)
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Save Draft</Button>
              <Button onClick={handleCreateCampaign}>Schedule Campaign</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Integration</CardTitle>
              <CardDescription>Connect and automate your social media marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Facebook className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Facebook</h3>
                      <p className="text-sm text-gray-500">Connect your Facebook business page</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Instagram className="h-8 w-8 text-pink-600" />
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <p className="text-sm text-gray-500">Connect your Instagram business account</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Twitter className="h-8 w-8 text-blue-400" />
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <p className="text-sm text-gray-500">Connect your Twitter profile</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Social Media Scheduler</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Schedule posts across multiple social media platforms.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="post-content">Post Content</Label>
                    <textarea 
                      id="post-content"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="Write your social media post here..."
                    ></textarea>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Platforms</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="platform-fb" />
                          <label
                            htmlFor="platform-fb"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Facebook
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="platform-ig" />
                          <label
                            htmlFor="platform-ig"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Instagram
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="platform-tw" />
                          <label
                            htmlFor="platform-tw"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Twitter
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Schedule</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input type="date" />
                        <Input type="time" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4">Schedule Post</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingAutomationPage;
