
import React, { useState } from 'react';
import { 
  Tag,
  Gift,
  Award,
  Megaphone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const PromotionalToolsPage = () => {
  const { subscriptionTier } = useAppContext();
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('10');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appliedProducts, setAppliedProducts] = useState<string[]>([]);

  // Mock products data
  const products = [
    { id: '1', name: 'Farm Fresh Eggs', price: 4.99 },
    { id: '2', name: 'Organic Honey', price: 12.99 },
    { id: '3', name: 'Handmade Soap', price: 6.50 },
    { id: '4', name: 'Grass-fed Beef', price: 18.99 },
  ];

  const form = useForm({
    defaultValues: {
      emailSubject: '',
      emailBody: '',
    }
  });

  const handleGenerateDiscount = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setDiscountCode(code);
    toast({
      title: "Discount Code Generated",
      description: `Your discount code ${code} is ready to use.`,
    });
  };

  const handleSaveDiscount = () => {
    if (!discountCode) {
      toast({
        title: "Error",
        description: "Please generate a discount code first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Discount Saved",
      description: `Discount code ${discountCode} (${discountPercent}% off) has been saved.`,
    });
  };

  const handleTriggerZapier = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      // Simulating API call to Zapier webhook
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request Sent",
        description: "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailCampaign = (data: any) => {
    toast({
      title: "Email Campaign Scheduled",
      description: "Your email campaign has been scheduled for sending.",
    });
    form.reset();
  };

  const toggleProductSelection = (productId: string) => {
    setAppliedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isPremium = subscriptionTier === 'premium';
  const isStandardOrBetter = subscriptionTier === 'standard' || subscriptionTier === 'premium';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Promotional Tools</h1>
          <p className="text-gray-600">
            {subscriptionTier === 'basic' ? 'Basic' : 
             subscriptionTier === 'standard' ? 'Enhanced' : 'Advanced'} promotional tools for your store
          </p>
        </div>
      </div>

      <Tabs defaultValue="discounts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discounts">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>Discount Codes</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="email" disabled={!isStandardOrBetter}>
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>Email Campaigns</span>
              {!isStandardOrBetter && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Standard+
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p>Email campaigns are available for Standard and Premium subscriptions only.</p>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="integrations" disabled={!isPremium}>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Premium Integrations</span>
              {!isPremium && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p>Premium integrations are available for Premium subscription only.</p>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discounts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Discount Codes</CardTitle>
              <CardDescription>Generate and manage discount codes for your products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount-code">Discount Code</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        id="discount-code" 
                        placeholder="Generate or enter code" 
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button onClick={handleGenerateDiscount}>Generate</Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="discount-percent">Discount Percentage</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        id="discount-percent" 
                        type="number" 
                        min="1" 
                        max="99" 
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                      />
                      <span className="flex items-center">%</span>
                    </div>
                  </div>
                </div>

                <Collapsible open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium">Apply to specific products</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isDiscountOpen ? 'Hide' : 'Show'} products
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent className="mt-4">
                    <div className="border rounded-md p-4 space-y-2">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`product-${product.id}`}
                            checked={appliedProducts.includes(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                          />
                          <label 
                            htmlFor={`product-${product.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                          >
                            <span>{product.name}</span>
                            <span>${product.price.toFixed(2)}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDiscount}>Save Discount</Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Active Discount Codes</h3>
            <div className="text-gray-500">
              No active discount codes. Create one above to see it here.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          {isStandardOrBetter ? (
            <Card>
              <CardHeader>
                <CardTitle>Email Campaign</CardTitle>
                <CardDescription>Create and send email campaigns to your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(handleSendEmailCampaign)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input 
                        id="email-subject" 
                        placeholder="Enter subject line"
                        {...form.register("emailSubject")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email-body">Email Body</Label>
                      <textarea 
                        id="email-body"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                        placeholder="Compose your email message here..."
                        {...form.register("emailBody")}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2">
                        <Checkbox id="include-discount" />
                        <span>Include current discount code</span>
                      </Label>
                    </div>
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Preview Email</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px]">
                      <div className="space-y-2">
                        <h3 className="font-medium">Email Preview</h3>
                        <div className="border-b pb-2">
                          <p className="text-sm font-medium">Subject: {form.watch("emailSubject") || "[No subject]"}</p>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm whitespace-pre-wrap">
                            {form.watch("emailBody") || "Email body will appear here..."}
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button type="submit">Schedule Campaign</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Megaphone className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Email Campaigns</h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Unlock email campaigns by upgrading to the Standard or Premium subscription.
              </p>
              <Button>Upgrade Subscription</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          {isPremium ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zapier Integration</CardTitle>
                  <CardDescription>Connect your store to 3000+ apps with Zapier</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTriggerZapier} className="space-y-4">
                    <div>
                      <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                      <Input 
                        id="zapier-webhook" 
                        placeholder="https://hooks.zapier.com/hooks/catch/..."
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Connecting..." : "Test Connection"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Integration</CardTitle>
                  <CardDescription>Automatically post products to social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="justify-start">
                      <Gift className="mr-2 h-4 w-4" /> Connect Facebook
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Gift className="mr-2 h-4 w-4" /> Connect Instagram
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Gift className="mr-2 h-4 w-4" /> Connect Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Award className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Premium Integrations</h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Unlock premium integrations by upgrading to the Premium subscription.
              </p>
              <Button>Upgrade Subscription</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionalToolsPage;
