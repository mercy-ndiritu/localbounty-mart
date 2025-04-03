import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/contexts/AppContext';
import { MessageSquare, Users, Clock, ChevronRight, Send } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { toast } from '@/components/ui/use-toast';

const CustomerSupportPage = () => {
  const { subscriptionTier } = useAppContext();
  const [activeTab, setActiveTab] = useState('inquiries');

  const supportInquiries = [
    {
      id: '1',
      customerName: 'Alice Johnson',
      subject: 'Order Inquiry',
      status: 'Open',
      lastUpdate: '2 hours ago',
    },
    {
      id: '2',
      customerName: 'Bob Williams',
      subject: 'Product Question',
      status: 'Pending',
      lastUpdate: '1 day ago',
    },
    {
      id: '3',
      customerName: 'Charlie Brown',
      subject: 'Return Request',
      status: 'Closed',
      lastUpdate: '3 days ago',
    },
  ];

  const renderInquiriesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Inquiries</CardTitle>
          <CardDescription>Respond to customer questions and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {supportInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.lastUpdate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Reply</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Inquiry</CardTitle>
          <CardDescription>Respond to a new customer inquiry</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" placeholder="Enter customer name" />
            </div>
            <div>
              <Label htmlFor="inquiry-subject">Subject</Label>
              <Input id="inquiry-subject" placeholder="Enter inquiry subject" />
            </div>
            <div>
              <Label htmlFor="inquiry-message">Message</Label>
              <textarea
                id="inquiry-message"
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                placeholder="Enter your message here..."
              />
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Support Analytics</CardTitle>
          <CardDescription>View support performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-2">Response Time</h3>
              <p className="text-3xl font-bold">24h</p>
              <p className="text-sm text-gray-500">Average response time</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-2">Resolution Rate</h3>
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-gray-500">Inquiries resolved within 48h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>View individual team member performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries Resolved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Response Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">125</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20h</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">110</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">26h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const isRestricted = () => subscriptionTier === 'basic';

  const renderRedirectToUpgrade = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-medium mb-2">Customer Support</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Unlock customer support features by upgrading to the Standard or Premium subscription.
      </p>
      <Button>Upgrade Subscription</Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-gray-600">Respond to customer inquiries and manage support tickets</p>
        </div>
      </div>

      {isRestricted() ? (
        renderRedirectToUpgrade()
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inquiries">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Inquiries</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="mt-6">
            {renderInquiriesTab()}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            {renderAnalyticsTab()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CustomerSupportPage;
