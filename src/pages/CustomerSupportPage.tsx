
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Mail, 
  Users, 
  Settings, 
  Search, 
  Star,
  Calendar,
  User,
  Send
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar';

const CustomerSupportPage = () => {
  const { subscriptionTier } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Redirect if user doesn't have standard or premium subscription
  React.useEffect(() => {
    if (subscriptionTier === 'basic') {
      navigate('/subscription', { state: { from: 'customer-support' } });
      toast({
        title: "Subscription Required",
        description: "You need at least a Standard subscription to access Customer Support tools.",
        variant: "destructive"
      });
    }
  }, [subscriptionTier, navigate, toast]);

  // Mock support tickets
  const tickets = [
    {
      id: 1,
      customer: 'Jane Smith',
      subject: 'Order not received',
      message: 'I ordered product #12345 over a week ago and haven\'t received it yet. Could you please check the status?',
      date: '2 hours ago',
      status: 'open',
      unread: true
    },
    {
      id: 2,
      customer: 'John Doe',
      subject: 'Wrong item shipped',
      message: 'I received a blue mug instead of the red one I ordered. Order #54321.',
      date: '1 day ago',
      status: 'open',
      unread: true
    },
    {
      id: 3,
      customer: 'Sarah Johnson',
      subject: 'Return request',
      message: 'The product I received is damaged. I would like to return it and get a refund.',
      date: '2 days ago',
      status: 'open',
      unread: false
    },
    {
      id: 4,
      customer: 'Michael Brown',
      subject: 'Question about product',
      message: 'Is this product suitable for outdoor use?',
      date: '3 days ago',
      status: 'closed',
      unread: false
    },
    {
      id: 5,
      customer: 'Emily Wilson',
      subject: 'Discount inquiry',
      message: 'Do you offer any discounts for bulk orders?',
      date: '1 week ago',
      status: 'closed',
      unread: false
    }
  ];

  // Get the selected ticket data
  const currentTicket = tickets.find(ticket => ticket.id === selectedTicket);

  // Mock conversation for the selected ticket
  const ticketConversation = [
    {
      id: 1,
      sender: 'customer',
      name: currentTicket?.customer || '',
      message: currentTicket?.message || '',
      timestamp: currentTicket?.date || ''
    },
    {
      id: 2,
      sender: 'seller',
      name: 'You',
      message: "Thank you for reaching out. I'm looking into this issue and will get back to you shortly.",
      timestamp: '1 hour ago'
    }
  ];

  const handleSendReply = () => {
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer."
    });
  };

  const handleCloseTicket = () => {
    toast({
      title: "Ticket Closed",
      description: "The support ticket has been closed successfully."
    });
    setSelectedTicket(null);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-semibold px-2">Customer Support</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'inbox'} 
                  onClick={() => setActiveTab('inbox')} 
                  tooltip="Inbox"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Inbox</span>
                  <SidebarMenuBadge>2</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'customers'} 
                  onClick={() => setActiveTab('customers')} 
                  tooltip="Customers"
                >
                  <Users className="h-5 w-5 mr-2" />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'templates'} 
                  onClick={() => setActiveTab('templates')} 
                  tooltip="Response Templates"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  <span>Templates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'settings'} 
                  onClick={() => setActiveTab('settings')} 
                  tooltip="Settings"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 container py-8">
          {activeTab === 'inbox' && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Support Tickets</h1>
                    <p className="text-gray-500">Manage your customer inquiries and support requests</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Search tickets..." 
                        className="w-full pl-8"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tickets</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className={`lg:col-span-${selectedTicket ? '5' : '12'} space-y-4`}>
                  {tickets.map((ticket) => (
                    <Card 
                      key={ticket.id} 
                      className={`cursor-pointer hover:bg-gray-50 ${selectedTicket === ticket.id ? 'border-primary ring-1 ring-primary' : ''}`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3 items-center">
                            <Avatar>
                              <AvatarFallback>{ticket.customer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {ticket.customer}
                                {ticket.unread && (
                                  <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />
                                )}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {ticket.date}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                            {ticket.status === 'open' ? 'Open' : 'Closed'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ticket.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedTicket && currentTicket && (
                  <div className="lg:col-span-7 space-y-6">
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{currentTicket.subject}</CardTitle>
                            <CardDescription>
                              Ticket #{selectedTicket} • {currentTicket.status === 'open' ? 'Open' : 'Closed'} • Created {currentTicket.date}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-1" /> Priority
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleCloseTicket}>
                              Close Ticket
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-6 p-6">
                          {ticketConversation.map((message) => (
                            <div key={message.id} className="flex gap-4">
                              <Avatar>
                                <AvatarFallback>
                                  {message.sender === 'customer' ? currentTicket.customer.charAt(0) : 'Y'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{message.name}</span>
                                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                                </div>
                                <div className="text-sm">{message.message}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="p-4">
                          <Textarea 
                            placeholder="Type your reply..." 
                            className="mb-4 min-h-24" 
                          />
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Insert template" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="greeting">Greeting</SelectItem>
                                  <SelectItem value="shipping">Shipping Info</SelectItem>
                                  <SelectItem value="returns">Returns Policy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleSendReply}>
                              <Send className="h-4 w-4 mr-2" /> Send Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Customer Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Name:</span>
                          <span className="text-sm font-medium">{currentTicket.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Email:</span>
                          <span className="text-sm font-medium">{currentTicket.customer.toLowerCase().replace(' ', '.') + '@example.com'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Customer since:</span>
                          <span className="text-sm font-medium">Mar 12, 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Orders:</span>
                          <span className="text-sm font-medium">7</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <User className="h-4 w-4 mr-2" /> View Customer Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold">Customer Management</h1>
                <p className="text-gray-500">View and manage your customer information</p>
              </div>
              
              <div className="flex justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search customers..." 
                    className="w-full pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="repeat">Repeat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    Export Data
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Orders</th>
                          <th className="text-left py-3 px-4">First Order</th>
                          <th className="text-left py-3 px-4">Last Order</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Jane Smith', email: 'jane.smith@example.com', orders: 12, first: 'Mar 15, 2022', last: 'Jun 23, 2023' },
                          { name: 'John Doe', email: 'john.doe@example.com', orders: 8, first: 'Nov 3, 2022', last: 'May 19, 2023' },
                          { name: 'Sarah Johnson', email: 'sarah.j@example.com', orders: 5, first: 'Jan 27, 2023', last: 'Jun 02, 2023' },
                          { name: 'Michael Brown', email: 'mbrown@example.com', orders: 3, first: 'Apr 11, 2023', last: 'May 30, 2023' },
                          { name: 'Emily Wilson', email: 'e.wilson@example.com', orders: 1, first: 'Jun 14, 2023', last: 'Jun 14, 2023' }
                        ].map((customer, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{customer.name}</td>
                            <td className="py-3 px-4">{customer.email}</td>
                            <td className="py-3 px-4">{customer.orders}</td>
                            <td className="py-3 px-4">{customer.first}</td>
                            <td className="py-3 px-4">{customer.last}</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Message</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold">Response Templates</h1>
                <p className="text-gray-500">Create and manage reusable response templates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                    <CardDescription>Template for order status inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Thank you for your inquiry. Your order #[ORDER_NUMBER] is currently [STATUS] and is expected to arrive by [DELIVERY_DATE]. Please let me know if you have any further questions!
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Edit</Button>
                    <Button>Use Template</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Returns Policy</CardTitle>
                    <CardDescription>Template for return requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      We're sorry to hear that you're not satisfied with your purchase. Our return policy allows returns within 30 days of delivery. Please provide your order number and we'll guide you through the return process.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Edit</Button>
                    <Button>Use Template</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>Template for product inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Thank you for your interest in [PRODUCT_NAME]. This product [PRODUCT_DETAILS]. If you have any specific questions about this item, please don't hesitate to ask!
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Edit</Button>
                    <Button>Use Template</Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Create New Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="e.g., Shipping Delay" />
                  </div>
                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Input id="template-description" placeholder="Brief description of this template" />
                  </div>
                  <div>
                    <Label htmlFor="template-content">Template Content</Label>
                    <Textarea 
                      id="template-content" 
                      placeholder="Write your template content here..." 
                      className="min-h-32"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use [PLACEHOLDER] format for dynamic content that will be replaced when using the template.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Template</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold">Support Settings</h1>
                <p className="text-gray-500">Configure your customer support preferences</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="support-email">Support Email Address</Label>
                      <Input id="support-email" defaultValue="support@yourbusiness.com" />
                    </div>
                    <div>
                      <Label htmlFor="auto-reply">Automatic Reply Message</Label>
                      <Textarea 
                        id="auto-reply" 
                        defaultValue="Thank you for contacting us! We've received your message and will get back to you within 24 hours." 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notification Settings</h4>
                        <p className="text-sm text-gray-500">
                          Configure how you receive support notifications
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>

                {subscriptionTier === 'premium' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Premium Features</CardTitle>
                      <CardDescription>Advanced features available on your Premium plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">Automated Response AI</p>
                            <p className="text-sm text-gray-500">Use AI to automatically respond to common inquiries</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">Customer Satisfaction Surveys</p>
                            <p className="text-sm text-gray-500">Send automated surveys after ticket resolution</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Knowledge Base Integration</p>
                            <p className="text-sm text-gray-500">Connect your knowledge base articles</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerSupportPage;
