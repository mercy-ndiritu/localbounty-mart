
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Truck, 
  MapPin, 
  Settings, 
  Plus, 
  Trash2, 
  Edit
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
import { Label } from '@/components/ui/label';
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const ShippingManagementPage = () => {
  const { subscriptionTier } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('shipping-zones');
  const [openDialog, setOpenDialog] = useState(false);

  // Redirect if user doesn't have standard or premium subscription
  React.useEffect(() => {
    if (subscriptionTier === 'basic') {
      navigate('/subscription', { state: { from: 'shipping' } });
      toast({
        title: "Subscription Required",
        description: "You need at least a Standard subscription to access Shipping Management.",
        variant: "destructive"
      });
    }
  }, [subscriptionTier, navigate, toast]);

  // Mock shipping zones data
  const shippingZones = [
    { id: 1, name: 'Domestic', regions: 'United States', methods: ['Standard', 'Express'] },
    { id: 2, name: 'International', regions: 'Worldwide', methods: ['Standard'] },
    { id: 3, name: 'Local', regions: 'Within 25 miles', methods: ['Same Day', 'Next Day'] }
  ];

  // Mock shipping methods data
  const shippingMethods = [
    { id: 1, name: 'Standard Shipping', price: '$5.99', estimated: '3-5 days', zone: 'Domestic' },
    { id: 2, name: 'Express Shipping', price: '$12.99', estimated: '1-2 days', zone: 'Domestic' },
    { id: 3, name: 'International Standard', price: '$19.99', estimated: '7-14 days', zone: 'International' },
    { id: 4, name: 'Same Day Delivery', price: '$15.99', estimated: 'Today', zone: 'Local' },
    { id: 5, name: 'Next Day Delivery', price: '$8.99', estimated: 'Tomorrow', zone: 'Local' }
  ];

  // Forms handlers - would connect to a real backend in production
  const handleAddZone = () => {
    toast({
      title: "Zone Added",
      description: "New shipping zone has been created successfully."
    });
    setOpenDialog(false);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your shipping settings have been updated."
    });
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-semibold px-2">Shipping Management</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'shipping-zones'} 
                  onClick={() => setActiveTab('shipping-zones')} 
                  tooltip="Shipping Zones"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Shipping Zones</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'shipping-methods'} 
                  onClick={() => setActiveTab('shipping-methods')} 
                  tooltip="Shipping Methods"
                >
                  <Truck className="h-5 w-5 mr-2" />
                  <span>Shipping Methods</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'packaging'} 
                  onClick={() => setActiveTab('packaging')} 
                  tooltip="Packaging"
                >
                  <Package className="h-5 w-5 mr-2" />
                  <span>Packaging</span>
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
          {activeTab === 'shipping-zones' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Shipping Zones</h1>
                  <p className="text-gray-500">Manage your shipping zones and regions</p>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Zone
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Shipping Zone</DialogTitle>
                      <DialogDescription>
                        Create a new shipping zone to group regions with similar shipping rates and methods.
                      </DialogDescription>
                    </DialogHeader>
                    <Form>
                      <div className="space-y-4 py-4">
                        <FormField name="name">
                          <FormItem>
                            <FormLabel>Zone Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Domestic, International, etc." />
                            </FormControl>
                          </FormItem>
                        </FormField>
                        <FormField name="regions">
                          <FormItem>
                            <FormLabel>Regions</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., United States, Europe, etc." />
                            </FormControl>
                            <FormDescription>
                              Enter comma-separated list of regions or countries
                            </FormDescription>
                          </FormItem>
                        </FormField>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddZone}>Create Zone</Button>
                      </DialogFooter>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                {shippingZones.map(zone => (
                  <Card key={zone.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>{zone.name}</CardTitle>
                        <CardDescription>Regions: {zone.regions}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {zone.methods.map((method, index) => (
                          <Badge key={index} variant="secondary">{method}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-gray-500">{zone.methods.length} shipping methods</p>
                      <Button variant="ghost" size="sm">Manage Methods</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipping-methods' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Shipping Methods</h1>
                  <p className="text-gray-500">Configure your shipping rates and delivery options</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Method Name</th>
                      <th className="text-left py-3 px-4">Zone</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Estimated Delivery</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingMethods.map(method => (
                      <tr key={method.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{method.name}</td>
                        <td className="py-3 px-4">{method.zone}</td>
                        <td className="py-3 px-4">{method.price}</td>
                        <td className="py-3 px-4">{method.estimated}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packaging' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Packaging Options</h1>
                <p className="text-gray-500">Manage your packaging materials and options</p>
              </div>

              <Tabs defaultValue="packaging-types">
                <TabsList className="mb-4">
                  <TabsTrigger value="packaging-types">Packaging Types</TabsTrigger>
                  <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="packaging-types" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Packaging Options</CardTitle>
                      <CardDescription>Configure the packaging options available for your products</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Small Box</p>
                          <p className="text-sm text-gray-500">For small items under 1lb</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 font-medium">$1.99</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Medium Box</p>
                          <p className="text-sm text-gray-500">For items 1-5lbs</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 font-medium">$2.99</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Large Box</p>
                          <p className="text-sm text-gray-500">For items over 5lbs</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 font-medium">$4.99</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Eco-friendly Mailer</p>
                          <p className="text-sm text-gray-500">For soft goods</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 font-medium">$1.49</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Add New Packaging Option</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="dimensions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Package Dimensions</CardTitle>
                      <CardDescription>Configure standard dimensions for your packaging options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-8">Dimension settings content will go here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Packaging Materials</CardTitle>
                      <CardDescription>Manage your packaging materials inventory</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-8">Materials inventory management will go here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Shipping Settings</h1>
                <p className="text-gray-500">Configure your global shipping settings and preferences</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="carrier">Default Carrier</Label>
                        <Select defaultValue="usps">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a carrier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Carriers</SelectLabel>
                              <SelectItem value="usps">USPS</SelectItem>
                              <SelectItem value="ups">UPS</SelectItem>
                              <SelectItem value="fedex">FedEx</SelectItem>
                              <SelectItem value="dhl">DHL</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="defaultMethod">Default Shipping Method</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Shipping</SelectItem>
                            <SelectItem value="express">Express Shipping</SelectItem>
                            <SelectItem value="local">Local Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                        <Badge variant="outline">Optional</Badge>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <Input
                          id="freeShippingThreshold"
                          type="number"
                          placeholder="0.00"
                          className="pl-7"
                          defaultValue="50"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Set to zero to disable free shipping</p>
                    </div>

                    <div>
                      <Label htmlFor="shippingOrigin">Shipping Origin Address</Label>
                      <Input id="shippingOrigin" placeholder="123 Main St, Anytown, CA 12345" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Save Settings</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Real-time Carrier Rates</p>
                          <p className="text-sm text-gray-500">Show live shipping rates from carriers</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Handling Fees</p>
                          <p className="text-sm text-gray-500">Add handling fees to shipping rates</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Shipping Insurance</p>
                          <p className="text-sm text-gray-500">Configure default insurance settings</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ShippingManagementPage;
