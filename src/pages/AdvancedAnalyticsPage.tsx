
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, Users, ShoppingBag, DollarSign, Award, PieChart as PieChartIcon, LineChart as LineChartIcon, BarChart2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

// Sample data for charts
const salesData = [
  { month: 'Jan', revenue: 1500, profit: 300, target: 2000 },
  { month: 'Feb', revenue: 2500, profit: 800, target: 2000 },
  { month: 'Mar', revenue: 3500, profit: 1200, target: 2000 },
  { month: 'Apr', revenue: 4000, profit: 1500, target: 3000 },
  { month: 'May', revenue: 5500, profit: 2000, target: 3000 },
  { month: 'Jun', revenue: 4800, profit: 1800, target: 3000 },
  { month: 'Jul', revenue: 6000, profit: 2300, target: 4000 },
  { month: 'Aug', revenue: 7200, profit: 2800, target: 4000 },
  { month: 'Sep', revenue: 6800, profit: 2500, target: 5000 },
  { month: 'Oct', revenue: 8000, profit: 3200, target: 5000 },
  { month: 'Nov', revenue: 9500, profit: 4000, target: 6000 },
  { month: 'Dec', revenue: 11000, profit: 4800, target: 6000 },
];

const customerSegmentData = [
  { name: 'New', value: 45 },
  { name: 'Returning', value: 35 },
  { name: 'Loyal', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const productPerformanceData = [
  { name: 'Product A', sales: 160, views: 240, conversion: 0.67 },
  { name: 'Product B', sales: 220, views: 398, conversion: 0.55 },
  { name: 'Product C', sales: 190, views: 280, conversion: 0.68 },
  { name: 'Product D', sales: 120, views: 320, conversion: 0.38 },
  { name: 'Product E', sales: 230, views: 400, conversion: 0.58 },
];

const AdvancedAnalyticsPage = () => {
  const { subscriptionTier } = useAppContext();
  
  // Check if user has premium subscription
  if (subscriptionTier !== 'premium') {
    return (
      <Navigate to="/subscription" replace />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-gray-600">Premium insights to grow your business</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            Export Report
          </Button>
          <Button>
            Schedule Reports
          </Button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">$67,584</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+22% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                <p className="text-2xl font-bold">$128.54</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+8.2% from last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Customer LTV</p>
                <p className="text-2xl font-bold">$1,245</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+12% from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold">4.28%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+1.2% from last month</span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="revenue">
            <div className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Revenue Analysis</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="customers">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Customer Segments</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="products">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Product Performance</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
              <CardDescription>Monthly revenue performance against targets</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="target" stroke="#ff7300" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customer types</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerSegmentData.map((entry, index) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Monthly customer retention rate</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', retention: 65 },
                        { month: 'Feb', retention: 68 },
                        { month: 'Mar', retention: 72 },
                        { month: 'Apr', retention: 75 },
                        { month: 'May', retention: 79 },
                        { month: 'Jun', retention: 82 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="retention" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales, views, and conversion rates by product</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#8884d8" />
                    <Bar yAxisId="left" dataKey="views" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Reports</CardTitle>
            <CardDescription>Access comprehensive business insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sales Forecast Report</h3>
                <p className="text-sm text-gray-500">Predictive analytics for future sales</p>
              </div>
              <Button variant="ghost" className="flex items-center gap-1">
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cohort Analysis</h3>
                <p className="text-sm text-gray-500">Customer behavior over time</p>
              </div>
              <Button variant="ghost" className="flex items-center gap-1">
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="font-medium">Inventory Optimization</h3>
                <p className="text-sm text-gray-500">Recommendations based on sales patterns</p>
              </div>
              <Button variant="ghost" className="flex items-center gap-1">
                View <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Analytics</CardTitle>
            <CardDescription>Build your own custom reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              Create tailored reports using our advanced analytics tools. Select metrics, time periods, and visualizations to generate insights specific to your business needs.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="outline" className="flex items-center gap-1">
                New Report
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                Schedule Report
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                Data Export
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                API Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsPage;
