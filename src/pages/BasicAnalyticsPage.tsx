import React from 'react';
import { 
  BarChart4, 
  ArrowUp, 
  ArrowDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Megaphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const BasicAnalyticsPage = () => {
  const { subscriptionTier } = useAppContext();
  
  // For demo purposes, using mock data
  // In a real app, this would come from the seller's actual sales data
  const recentSalesData = [
    { name: 'Jan', revenue: 1200 },
    { name: 'Feb', revenue: 1900 },
    { name: 'Mar', revenue: 1500 },
    { name: 'Apr', revenue: 2400 },
    { name: 'May', revenue: 2700 },
    { name: 'Jun', revenue: 3000 },
    { name: 'Jul', revenue: 2500 },
  ];

  const productPerformanceData = [
    { name: 'Product A', sales: 78 },
    { name: 'Product B', sales: 45 },
    { name: 'Product C', sales: 63 },
    { name: 'Product D', sales: 32 },
    { name: 'Product E', sales: 54 },
  ];

  const customerSourceData = [
    { name: 'Direct', value: 45 },
    { name: 'Search', value: 30 },
    { name: 'Referral', value: 15 },
    { name: 'Social', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Summary metrics (mock data)
  const metrics = [
    {
      title: 'Total Sales',
      value: '$12,628',
      change: '+12.5%',
      positive: true,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Total Orders',
      value: '356',
      change: '+8.2%',
      positive: true,
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      title: 'Total Customers',
      value: '213',
      change: '+25.8%',
      positive: true,
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Product Views',
      value: '1,456',
      change: '-3.2%',
      positive: false,
      icon: <Package className="h-4 w-4" />
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">
            {subscriptionTier === 'basic' ? 'Basic' : 
             subscriptionTier === 'standard' ? 'Enhanced' : 'Advanced'} analytics for your store
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link to="/seller/promotions">
              <Megaphone className="h-4 w-4" />
              <span>View Promotional Tools</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div className={`p-2 rounded-full ${metric.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                  {metric.icon}
                </div>
              </div>
              <div className={`flex items-center mt-2 text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{metric.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  theme: {
                    light: "hsl(var(--market-primary))",
                    dark: "hsl(var(--market-primary))",
                  },
                },
              }}
              className="aspect-[4/3]"
            >
              <LineChart data={recentSalesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" name="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  theme: {
                    light: "hsl(var(--market-primary))",
                    dark: "hsl(var(--market-primary))",
                  },
                },
              }}
              className="aspect-[4/3]"
            >
              <BarChart data={productPerformanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" name="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Source Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Acquisition Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicAnalyticsPage;
