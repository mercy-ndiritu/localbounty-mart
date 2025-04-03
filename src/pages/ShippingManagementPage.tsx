import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Truck, Package, Map, Plus, Save } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useForm, Controller } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

const ShippingManagementPage = () => {
  const { subscriptionTier } = useAppContext();
  const [activeTab, setActiveTab] = useState('methods');
  const [shippingRules, setShippingRules] = useState([
    { id: '1', name: 'Standard Shipping', regions: ['Domestic'], rate: '$5.00' },
    { id: '2', name: 'Express Shipping', regions: ['Domestic'], rate: '$15.00' },
    { id: '3', name: 'International', regions: ['International'], rate: '$25.00' }
  ]);

  const form = useForm({
    defaultValues: {
      name: '',
      regions: [''],
      rate: '',
    }
  });

  const handleAddShippingRule = (values: any) => {
    const newRule = {
      id: Math.random().toString(36).substring(7),
      name: values.name,
      regions: values.regions,
      rate: `$${values.rate}`,
    };

    setShippingRules([...shippingRules, newRule]);
    form.reset();
    toast({
      title: "Shipping Method Added",
      description: `New shipping method "${values.name}" has been added.`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const renderRedirectToUpgrade = () => {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Truck className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">Shipping Management</h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Unlock shipping management by upgrading to the Standard or Premium subscription.
        </p>
        <Button>Upgrade Subscription</Button>
      </div>
    );
  };

  const isRestricted = () => {
    return subscriptionTier === 'basic';
  };

  const renderShippingMethods = () => {
    return (
      <div className="space-y-6">
        {/* Shipping Methods Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shippingRules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.regions.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Shipping Method */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Shipping Method</CardTitle>
            <CardDescription>Create a new shipping method for your products</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddShippingRule)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Method Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Standard Shipping" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regions</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="domestic" defaultChecked />
                            <label htmlFor="domestic">Domestic</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="international" />
                            <label htmlFor="international">International</label>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <Label htmlFor="rate">Rate (in $)</Label>
                  <Input 
                    id="rate"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...form.register("rate")}
                  />
                </div>

                <Button type="submit" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" /> Add Shipping Method
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPackagingOptions = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Packaging Options</CardTitle>
            <CardDescription>Manage your packaging options</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Here you can manage different packaging options for your products.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderShippingZones = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Zones</CardTitle>
            <CardDescription>Manage your shipping zones</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Here you can manage different shipping zones for your products.</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shipping Management</h1>
          <p className="text-gray-600">Configure your shipping options and rates</p>
        </div>
      </div>
      
      {isRestricted() ? (
        renderRedirectToUpgrade()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="methods">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Shipping Methods</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="packaging">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Packaging Options</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="zones">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span>Shipping Zones</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="mt-6">
            {renderShippingMethods()}
          </TabsContent>
          
          <TabsContent value="packaging" className="mt-6">
            {renderPackagingOptions()}
          </TabsContent>
          
          <TabsContent value="zones" className="mt-6">
            {renderShippingZones()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ShippingManagementPage;
