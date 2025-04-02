import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowRight, PackageSearch, LineChart, Tag, Megaphone, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerDashboardPage = () => {
  const { subscriptionTier } = useAppContext();

  // Features available based on subscription tier
  const features = [
    {
      title: "Product Management",
      description: "Manage your product listings",
      icon: <PackageSearch className="h-5 w-5" />,
      link: "/seller/products",
      available: true
    },
    {
      title: "Analytics",
      description: "View your store performance",
      icon: <LineChart className="h-5 w-5" />,
      link: "/seller/analytics",
      available: true
    },
    {
      title: "Promotional Tools",
      description: "Create and manage promotions",
      icon: <Tags className="h-5 w-5" />,
      link: "/seller/promotions",
      available: true
    },
    {
      title: "Shipping Management",
      description: "Manage shipping options and rates",
      icon: <PackageSearch className="h-5 w-5" />,
      link: "/shipping",
      available: subscriptionTier === 'standard' || subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic'
    },
    {
      title: "Customer Support",
      description: "Respond to customer inquiries",
      icon: <LineChart className="h-5 w-5" />,
      link: "/customer-support",
      available: subscriptionTier === 'standard' || subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic'
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your sales",
      icon: <LineChart className="h-5 w-5" />,
      link: "/advanced-analytics",
      available: subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic' || subscriptionTier === 'standard'
    },
    {
      title: "Marketing Automation",
      description: "Automate your marketing campaigns",
      icon: <Megaphone className="h-5 w-5" />,
      link: "/marketing-automation",
      available: subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic' || subscriptionTier === 'standard'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="text-gray-600">
          You are on the {subscriptionTier === 'basic' ? 'Basic' : 
                          subscriptionTier === 'standard' ? 'Standard' : 'Premium'} subscription plan
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className={!feature.available ? "opacity-70" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
              <div className={`p-2 rounded-full ${feature.available ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                {feature.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </CardContent>
            <CardFooter>
              {feature.available ? (
                <Button asChild variant="default" className="w-full">
                  <Link to={feature.link} className="flex items-center justify-center">
                    <span>Access</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button disabled variant="outline" className="w-full">
                  <Link to="/subscription" className="flex items-center justify-center">
                    Upgrade to Access
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Need to upgrade?</CardTitle>
            <CardDescription>Get more features with our premium plans</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Upgrade your subscription to access advanced features like shipping management, improved analytics, marketing tools, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/subscription">View Subscription Options</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
