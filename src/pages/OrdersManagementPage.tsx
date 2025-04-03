
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  ArrowUpDown, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package, 
  XCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { Order, OrderStatus } from '@/types';

const OrdersManagementPage = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading of orders
  useEffect(() => {
    // In a real app, this would fetch from a database
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order);
    setShowOrderDialog(true);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    if (updateOrderStatus) {
      updateOrderStatus(orderId, newStatus);
      toast({
        title: "Order status updated",
        description: `Order #${orderId.substring(4)} has been marked as ${newStatus}.`,
      });
      
      // If we're viewing this order, update the local state too
      if (viewingOrder && viewingOrder.id === orderId) {
        setViewingOrder({
          ...viewingOrder,
          status: newStatus
        });
      }
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders?.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Sort orders if a sort field is selected
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortField) {
      // Default sort by createdAt
      return sortDirection === 'desc' 
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    
    if (sortField === 'totalAmount') {
      return sortDirection === 'asc' 
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }
    
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      return sortDirection === 'asc'
        ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
        : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    }
    
    if (sortField === 'customerName' || sortField === 'status') {
      return sortDirection === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
    
    return 0;
  });

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'processing':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-KE', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/seller/dashboard')}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Orders Management</h1>
            <p className="text-gray-600">View and manage customer orders</p>
          </div>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-[700px]">
          {viewingOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Order #{viewingOrder.id.substring(4)}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Order Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">Status:</span>
                    {getStatusBadge(viewingOrder.status)}
                  </div>
                  
                  <Select
                    value={viewingOrder.status}
                    onValueChange={(value: OrderStatus) => handleStatusChange(viewingOrder.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Order Details and Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {viewingOrder.customerName}</div>
                      <div><span className="font-medium">Email:</span> {viewingOrder.customerEmail}</div>
                      <div><span className="font-medium">Phone:</span> {viewingOrder.customerPhone}</div>
                      <div className="pt-2 border-t">
                        <span className="font-medium">Shipping Address:</span>
                        <div className="mt-1">
                          {viewingOrder.shippingAddress.address}<br />
                          {viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.county}<br />
                          {viewingOrder.shippingAddress.postalCode}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Method:</span> 
                        {viewingOrder.payment.method === 'mpesa' ? 'M-Pesa' : 'Credit/Debit Card'}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> 
                        <Badge className={
                          viewingOrder.payment.status === 'completed' ? "bg-green-100 text-green-800" : 
                          viewingOrder.payment.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {viewingOrder.payment.status}
                        </Badge>
                      </div>
                      {viewingOrder.payment.transactionId && (
                        <div><span className="font-medium">Transaction ID:</span> {viewingOrder.payment.transactionId}</div>
                      )}
                      <div className="pt-2 border-t">
                        <span className="font-medium">Date:</span> {formatDate(viewingOrder.createdAt)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left">Product</th>
                            <th className="py-2 text-center">Quantity</th>
                            <th className="py-2 text-right">Price</th>
                            <th className="py-2 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewingOrder.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 text-left">{item.productName}</td>
                              <td className="py-3 text-center">{item.quantity}</td>
                              <td className="py-3 text-right">KES {item.price.toLocaleString()}</td>
                              <td className="py-3 text-right">KES {(item.price * item.quantity).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="pt-3 text-right font-medium">Subtotal:</td>
                            <td className="pt-3 text-right">
                              KES {viewingOrder.totalAmount.toLocaleString()}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="pt-1 text-right font-bold">Total:</td>
                            <td className="pt-1 text-right font-bold">
                              KES {viewingOrder.totalAmount.toLocaleString()}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowOrderDialog(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by order ID, customer name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0 overflow-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : sortedOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead onClick={() => handleSort('customerName')} className="cursor-pointer">
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('totalAmount')} className="cursor-pointer">
                    <div className="flex items-center">
                      Total
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.substring(4, 9)}</TableCell>
                    <TableCell>
                      <div>{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>KES {order.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        order.payment.status === 'completed' ? "bg-green-100 text-green-800" : 
                        order.payment.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {order.payment.method === 'mpesa' ? 'M-Pesa' : 'Card'}: {order.payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagementPage;
