
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionCard from '@/components/SubscriptionCard';
import { SUBSCRIPTION_TIERS } from '@/data/mockData';
import { CheckCircle, Star, Zap, BarChart4 } from 'lucide-react';

const SubscriptionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Seller Plan</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the plan that best fits your business needs. Upgrade or downgrade anytime as your business grows.
        </p>
      </div>
      
      {/* Pricing Toggle */}
      <div className="flex justify-center mb-12">
        <Tabs defaultValue="monthly" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            {/* Pricing cards will be shown for monthly pricing */}
          </TabsContent>
          <TabsContent value="annual">
            {/* Pricing cards will be shown for annual pricing with 20% discount */}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {SUBSCRIPTION_TIERS.map((tier, index) => (
          <SubscriptionCard 
            key={tier.id}
            id={tier.id}
            name={tier.name}
            price={tier.price}
            features={tier.features}
            productLimit={tier.productLimit}
            isPopular={index === 1} // Make the Standard plan (middle one) popular
          />
        ))}
      </div>
      
      {/* Features Comparison */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-center">Feature Comparison</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Features</th>
                <th className="py-3 px-4 text-center">Basic</th>
                <th className="py-3 px-4 text-center bg-market-accent">Standard</th>
                <th className="py-3 px-4 text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Product Listings</td>
                <td className="py-3 px-4 text-center">10 products</td>
                <td className="py-3 px-4 text-center bg-market-accent">50 products</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Product Images</td>
                <td className="py-3 px-4 text-center">1 per product</td>
                <td className="py-3 px-4 text-center bg-market-accent">5 per product</td>
                <td className="py-3 px-4 text-center">10 per product</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Analytics Dashboard</td>
                <td className="py-3 px-4 text-center">Basic</td>
                <td className="py-3 px-4 text-center bg-market-accent">Enhanced</td>
                <td className="py-3 px-4 text-center">Advanced</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Featured Products</td>
                <td className="py-3 px-4 text-center">-</td>
                <td className="py-3 px-4 text-center bg-market-accent">2 products</td>
                <td className="py-3 px-4 text-center">5 products</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Priority Support</td>
                <td className="py-3 px-4 text-center">-</td>
                <td className="py-3 px-4 text-center bg-market-accent">✓</td>
                <td className="py-3 px-4 text-center">✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Marketing Tools</td>
                <td className="py-3 px-4 text-center">-</td>
                <td className="py-3 px-4 text-center bg-market-accent">Basic</td>
                <td className="py-3 px-4 text-center">Advanced</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Featured Seller Status</td>
                <td className="py-3 px-4 text-center">-</td>
                <td className="py-3 px-4 text-center bg-market-accent">-</td>
                <td className="py-3 px-4 text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Become a Seller?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-market-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-market-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
            <p className="text-gray-600">
              Get started in minutes with our simple seller onboarding process.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-market-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8 text-market-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Reach</h3>
            <p className="text-gray-600">
              Connect with customers in your community who value local products.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-market-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-market-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple Delivery</h3>
            <p className="text-gray-600">
              Offer pickup or delivery options that work best for your business.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-market-light rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart4 className="h-8 w-8 text-market-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Growth Insights</h3>
            <p className="text-gray-600">
              Track your performance with detailed analytics and reporting.
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How do payments work?</h3>
            <p className="text-gray-600">
              Customers pay through our secure platform. We handle the payment processing and transfer the funds to your account, minus our service fee.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Do I need to handle shipping?</h3>
            <p className="text-gray-600">
              Yes, sellers are responsible for product delivery or arranging pickup options. We provide tools to help you manage delivery zones and options.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What are the fees?</h3>
            <p className="text-gray-600">
              Beyond the subscription fee, we charge a small transaction fee on each sale. Premium sellers enjoy reduced transaction fees.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Selling?</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Join our community of local sellers and grow your business today.
        </p>
        <Button size="lg" className="bg-market-primary hover:bg-market-dark">
          Sign Up as a Seller
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
