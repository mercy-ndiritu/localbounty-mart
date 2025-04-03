
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { ArrowRight, PackageSearch, LineChart, Tag, Megaphone, Tags, Truck, MessageSquare, Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';

const SellerDashboardPage = () => {
  const { subscriptionTier, products, orders } = useAppContext();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  });

  // Calculate order statistics
  useEffect(() => {
    if (orders) {
      // Get recent orders (up to 5)
      setRecentOrders(orders.slice(0, 5));
      
      // Calculate order status counts
      const stats = {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      };
      
      orders.forEach(order => {
        // @ts-ignore - TypeScript doesn't recognize the dynamic property access
        stats[order.status] += 1;
      });
      
      setOrderStats(stats);
    }
  }, [orders]);

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
      title: "Orders",
      description: "View and manage customer orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      link: "/seller/orders",
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
      icon: <Truck className="h-5 w-5" />,
      link: "/seller/shipping",
      available: subscriptionTier === 'standard' || subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic'
    },
    {
      title: "Customer Support",
      description: "Respond to customer inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      link: "/seller/customer-support",
      available: subscriptionTier === 'standard' || subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic'
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your sales",
      icon: <LineChart className="h-5 w-5" />,
      link: "/seller/advanced-analytics",
      available: subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic' || subscriptionTier === 'standard'
    },
    {
      title: "Marketing Automation",
      description: "Automate your marketing campaigns",
      icon: <Megaphone className="h-5 w-5" />,
      link: "/seller/marketing-automation",
      available: subscriptionTier === 'premium',
      comingSoon: subscriptionTier === 'basic' || subscriptionTier === 'standard'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="text-gray-600">
          You are on the {subscriptionTier === 'basic' ? 'Basic' : 
                          subscriptionTier === 'standard' ? 'Standard' : 'Premium'} subscription plan
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{products?.length || 0}</div>
            <p className="text-sm text-gray-500">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
            <p className="text-sm text-gray-500">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orderStats.pending}</div>
            <p className="text-sm text-gray-500">Pending Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orderStats.processing + orderStats.shipped}
            </div>
            <p className="text-sm text-gray-500">In Process</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="py-2 font-medium">#{order.id.substring(4, 9)}</td>
                        <td className="py-2">{order.customerName}</td>
                        <td className="py-2">{formatDate(order.createdAt)}</td>
                        <td className="py-2">{getStatusBadge(order.status)}</td>
                        <td className="py-2 text-right">KES {order.totalAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No orders yet</div>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/seller/orders" className="w-full">
              <Button variant="outline" className="w-full">
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Order Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Summary of order statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-yellow-100 text-yellow-800 mr-2">Pending</Badge>
                </div>
                <span className="font-semibold">{orderStats.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 mr-2">Processing</Badge>
                </div>
                <span className="font-semibold">{orderStats.processing}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-purple-100 text-purple-800 mr-2">Shipped</Badge>
                </div>
                <span className="font-semibold">{orderStats.shipped}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-green-100 text-green-800 mr-2">Delivered</Badge>
                </div>
                <span className="font-semibold">{orderStats.delivered}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-red-100 text-red-800 mr-2">Cancelled</Badge>
                </div>
                <span className="font-semibold">{orderStats.cancelled}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <h2 className="text-xl font-bold mb-4">Seller Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <Button disabled={feature.comingSoon} variant="outline" className="w-full">
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
