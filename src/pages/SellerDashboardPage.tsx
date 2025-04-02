import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  BarChart4, 
  Users, 
  MessageSquare, 
  PieChart, 
  Settings, 
  Share2, 
  Archive, 
  Tag,
  ArrowUpRight,
  Crown,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAppContext } from '@/contexts/AppContext';
import { DashboardFeature, SubscriptionTier } from '@/types';

const SellerDashboardPage = () => {
  const { userType, subscriptionTier } = useAppContext();
  const navigate = useNavigate();
  
  const currentSeller = {
    id: 's5',
    name: 'Your Store',
    description: 'Your store description',
    subscriptionTier: subscriptionTier,
    productCount: 5,
    location: 'Your Location',
    rating: 0
  };

  const dashboardFeatures: DashboardFeature[] = [
    {
      id: 'products',
      name: 'Product Management',
      description: 'Add, edit, and manage your product listings',
      icon: 'package',
      availableIn: ['basic', 'standard', 'premium']
    },
    {
      id: 'analytics-basic',
      name: 'Basic Analytics',
      description: 'View basic sales and visitor statistics',
      icon: 'bar-chart',
      availableIn: ['basic', 'standard', 'premium']
    },
    {
      id: 'analytics-advanced',
      name: 'Advanced Analytics',
      description: 'Detailed customer insights and sales forecasting',
      icon: 'pie-chart',
      availableIn: ['standard', 'premium']
    },
    {
      id: 'promotion',
      name: 'Promotional Tools',
      description: 'Create discounts and special offers',
      icon: 'tag',
      availableIn: ['standard', 'premium']
    },
    {
      id: 'featured',
      name: 'Featured Products',
      description: 'Highlight products in search and browse pages',
      icon: 'archive',
      availableIn: ['standard', 'premium']
    },
    {
      id: 'marketing',
      name: 'Marketing Support',
      description: 'Email campaigns and marketing assistance',
      icon: 'share2',
      availableIn: ['premium']
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: 'Get faster responses to your support requests',
      icon: 'message-square',
      availableIn: ['premium']
    },
    {
      id: 'featured-seller',
      name: 'Featured Seller Status',
      description: 'Boost visibility with featured seller badge',
      icon: 'crown',
      availableIn: ['premium']
    }
  ];
  
  const availableFeatures = dashboardFeatures.filter(
    feature => feature.availableIn.includes(currentSeller.subscriptionTier)
  );
  
  const lockedFeatures = dashboardFeatures.filter(
    feature => !feature.availableIn.includes(currentSeller.subscriptionTier)
  );

  const getProductLimit = (tier: SubscriptionTier) => {
    switch(tier) {
      case 'basic': return 10;
      case 'standard': return 50;
      case 'premium': return 'Unlimited';
      default: return 0;
    }
  };

  const productLimit = getProductLimit(currentSeller.subscriptionTier);
  const productUsagePercent = typeof productLimit === 'number' 
    ? Math.min(100, (currentSeller.productCount / productLimit) * 100)
    : 0;

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2023-08-15', amount: 32.50, status: 'Delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2023-08-14', amount: 18.75, status: 'Processing' },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2023-08-13', amount: 45.20, status: 'Pending' },
  ];

  const handleFeatureClick = (featureId: string) => {
    switch(featureId) {
      case 'products':
        navigate('/seller/products');
        break;
      case 'analytics-basic':
        navigate('/seller/analytics');
        break;
      case 'analytics-advanced':
        navigate('/seller/analytics');
        break;
      default:
        console.log(`Feature ${featureId} clicked`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-600">
            Welcome back to your {currentSeller.subscriptionTier.charAt(0).toUpperCase() + currentSeller.subscriptionTier.slice(1)} seller account
          </p>
        </div>
        {currentSeller.subscriptionTier !== 'premium' && (
          <Button 
            onClick={() => navigate('/subscription')}
            className="mt-4 md:mt-0 bg-market-primary hover:bg-market-dark"
          >
            Upgrade Plan
          </Button>
        )}
      </div>

      <Card className="mb-8 border-market-primary">
        <CardHeader className="bg-market-accent/20">
          <CardTitle className="flex justify-between items-center">
            <span>Your {currentSeller.subscriptionTier.charAt(0).toUpperCase() + currentSeller.subscriptionTier.slice(1)} Plan</span>
            {currentSeller.subscriptionTier !== 'premium' && (
              <Button 
                size="sm" 
                variant="outline" 
                className="border-market-primary text-market-primary hover:bg-market-light"
                onClick={() => navigate('/subscription')}
              >
                Upgrade <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Product Listings</h3>
              <div className="mt-1 flex items-baseline">
                <div className="text-2xl font-semibold">{currentSeller.productCount}</div>
                <div className="ml-2 text-sm text-gray-500">/ {productLimit}</div>
              </div>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-market-primary" 
                  style={{ width: `${productUsagePercent}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Analytics Access</h3>
              <p className="mt-1 text-xl font-semibold">
                {currentSeller.subscriptionTier === 'basic' ? 'Basic' : 
                 currentSeller.subscriptionTier === 'standard' ? 'Enhanced' : 'Advanced'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Featured Products</h3>
              <p className="mt-1 text-xl font-semibold">
                {currentSeller.subscriptionTier === 'basic' ? '0' : 
                 currentSeller.subscriptionTier === 'standard' ? '2' : '5'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Available Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {availableFeatures.map((feature) => {
          const IconComponent = 
            feature.icon === 'package' ? Package :
            feature.icon === 'bar-chart' ? BarChart4 :
            feature.icon === 'pie-chart' ? PieChart :
            feature.icon === 'message-square' ? MessageSquare :
            feature.icon === 'share2' ? Share2 :
            feature.icon === 'archive' ? Archive :
            feature.icon === 'tag' ? Tag :
            feature.icon === 'crown' ? Crown :
            Settings;
          
          return (
            <Card 
              key={feature.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-market-light p-2 rounded-lg mr-4">
                    <IconComponent className="h-6 w-6 text-market-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.name}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {lockedFeatures.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Upgrade to Unlock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {lockedFeatures.map((feature) => {
              const IconComponent = 
                feature.icon === 'package' ? Package :
                feature.icon === 'bar-chart' ? BarChart4 :
                feature.icon === 'pie-chart' ? PieChart :
                feature.icon === 'message-square' ? MessageSquare :
                feature.icon === 'share2' ? Share2 :
                feature.icon === 'archive' ? Archive :
                feature.icon === 'tag' ? Tag :
                feature.icon === 'crown' ? Crown :
                Settings;
              
              const requiredTier = feature.availableIn[0].charAt(0).toUpperCase() + feature.availableIn[0].slice(1);
              
              return (
                <Card key={feature.id} className="opacity-70 hover:opacity-100 transition-opacity border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium mb-1">{feature.name}</h3>
                          <AlertCircle className="ml-1 h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                        <span className="text-xs py-1 px-2 bg-gray-100 rounded-full">
                          {requiredTier}+ Plan
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="flex flex-col h-24 items-center justify-center gap-1"
          onClick={() => navigate('/seller/products')}
        >
          <Package className="h-6 w-6" />
          <span>Add Product</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-1">
          <BarChart4 className="h-6 w-6" />
          <span>View Analytics</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-1">
          <Users className="h-6 w-6" />
          <span>Customers</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-1">
          <Settings className="h-6 w-6" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
