
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Map, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { Order } from '@/types';

const ShopperDashboardPage = () => {
  const { cart, orders = [] } = useAppContext();

  // Filter orders that belong to this customer (in a real app, this would use the customer ID)
  const myOrders = orders;

  const renderOrderStatus = (status: string) => {
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
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-gray-600">
          Welcome back to LocalBounty
        </p>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Orders
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Heart className="mr-2 h-4 w-4" />
            Saved Items
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <Map className="mr-2 h-4 w-4" />
            Addresses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>Track and manage your purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {myOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders.map((order: Order) => (
                        <tr key={order.id} className="border-t">
                          <td className="py-3 font-medium">#{order.id.substring(4, 9)}</td>
                          <td className="py-3">{formatDate(order.createdAt)}</td>
                          <td className="py-3">{renderOrderStatus(order.status)}</td>
                          <td className="py-3 text-right">KES {order.totalAmount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p>You haven't placed any orders yet</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="mt-1">John Doe</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="mt-1">john@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="mt-1">+254 712 345 678</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
              <CardDescription>Products you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p>You haven't saved any items yet</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Your Addresses</CardTitle>
              <CardDescription>Manage your delivery addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-base">Home</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">123 Main St</p>
                    <p className="text-sm">Nairobi</p>
                    <p className="text-sm">Nairobi County, 00100</p>
                    <p className="text-sm">+254 712 345 678</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                  </CardFooter>
                </Card>
                
                <Card className="border border-dashed flex items-center justify-center">
                  <Button variant="outline">Add New Address</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopperDashboardPage;
