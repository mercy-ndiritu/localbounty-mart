
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft,
  ArrowUpDown,
  Eye,
  AlertCircle
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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { Product, SubscriptionTier } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import ProductForm, { ProductFormValues } from '@/components/ProductForm';

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const { userType } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // In a real application, these would come from an API
  // For demo purposes, we'll use some mock data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'p1',
      name: 'Farm Fresh Eggs',
      description: 'Locally sourced farm fresh eggs',
      price: 4.99,
      image: '/placeholder.svg',
      category: 'farm',
      sellerId: 's5',
      stock: 24,
      deliveryOption: 'both'
    },
    {
      id: 'p2',
      name: 'Organic Tomatoes',
      description: 'Homegrown organic tomatoes',
      price: 3.49,
      image: '/placeholder.svg',
      category: 'farm',
      sellerId: 's5',
      stock: 15,
      deliveryOption: 'delivery'
    },
    {
      id: 'p3',
      name: 'Handmade Soap',
      description: 'Natural handmade soap with lavender',
      price: 6.99,
      image: '/placeholder.svg',
      category: 'handmade',
      sellerId: 's5',
      stock: 8,
      deliveryOption: 'pickup'
    },
    {
      id: 'p4',
      name: 'Fresh Honey',
      description: 'Raw unfiltered local honey',
      price: 9.99,
      image: '/placeholder.svg',
      category: 'farm',
      sellerId: 's5',
      stock: 12,
      deliveryOption: 'both'
    },
    {
      id: 'p5',
      name: 'Artisan Bread',
      description: 'Freshly baked sourdough bread',
      price: 5.49,
      image: '/placeholder.svg',
      category: 'handmade',
      sellerId: 's5',
      stock: 6,
      deliveryOption: 'pickup'
    }
  ]);

  // Mock subscription data - in real app would come from user profile
  const sellerSubscription: SubscriptionTier = 'basic';
  
  const getProductLimit = (tier: SubscriptionTier) => {
    switch(tier) {
      case 'basic': return 10;
      case 'standard': return 50;
      case 'premium': return 'Unlimited';
      default: return 0;
    }
  };

  const productLimit = getProductLimit(sellerSubscription);
  const productCount = products.length;
  const canAddMoreProducts = typeof productLimit === 'string' || productCount < productLimit;

  const handleAddProduct = (formData: ProductFormValues) => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new product with the form data
      const newProduct: Product = {
        id: `p${Math.floor(Math.random() * 1000)}`,
        ...formData,
        sellerId: 's5', // In a real app, this would be the current user's ID
      };
      
      // Add the new product to the list
      setProducts([...products, newProduct]);
      
      // Show success message
      toast({
        title: "Product added",
        description: `${formData.name} has been added to your product catalog.`,
      });
      
      // Close the dialog
      setShowProductDialog(false);
      setSubmitting(false);
    }, 1000);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products if a sort field is selected
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    
    if (sortField === 'price' || sortField === 'stock') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
    if (sortField === 'name' || sortField === 'category') {
      return sortDirection === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
    
    return 0;
  });

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'farm':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'groceries':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'handmade':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getDeliveryLabel = (option: string) => {
    switch (option) {
      case 'delivery': return 'Delivery';
      case 'pickup': return 'Pickup';
      case 'both': return 'Delivery & Pickup';
      default: return 'Unknown';
    }
  };

  const handleEditProduct = (productId: string) => {
    // In a real app, this would navigate to a product edit form
    console.log(`Editing product ${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would show a confirmation dialog and then delete
    console.log(`Deleting product ${productId}`);
  };

  const handleViewProduct = (productId: string) => {
    // Navigate to the product detail page
    navigate(`/products/${productId}`);
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
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-gray-600">Manage your product listings</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowProductDialog(true)}
          className="mt-4 md:mt-0 bg-market-primary hover:bg-market-dark flex items-center gap-2"
          disabled={!canAddMoreProducts}
        >
          <PlusCircle className="h-5 w-5" />
          Add New Product
        </Button>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            onSubmit={handleAddProduct} 
            onCancel={() => setShowProductDialog(false)} 
            isSubmitting={submitting}
          />
        </DialogContent>
      </Dialog>

      {/* Product limit info */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Product Listings</h3>
                <div className="mt-1 flex items-baseline">
                  <div className="text-2xl font-semibold">{productCount}</div>
                  <div className="ml-2 text-sm text-gray-500">/ {productLimit}</div>
                </div>
              </div>
              {!canAddMoreProducts && (
                <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-2 rounded-md">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>You've reached your product limit. <Button variant="link" className="p-0 h-auto text-market-primary" onClick={() => navigate('/subscription')}>Upgrade your plan</Button></span>
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="outline" className="text-market-primary border-market-primary">
                {sellerSubscription.charAt(0).toUpperCase() + sellerSubscription.slice(1)} Plan
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product table */}
      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('stock')} className="cursor-pointer">
                  <div className="flex items-center">
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Delivery Option</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {product.stock > 10 ? (
                        <span className="text-green-600">{product.stock}</span>
                      ) : product.stock > 0 ? (
                        <span className="text-orange-500">{product.stock} (Low)</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadgeClass(product.category)}>
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{getDeliveryLabel(product.deliveryOption)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewProduct(product.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagementPage;
