
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { CreditCard, Phone, Truck, User, Home, ChevronsRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { KenyanCounty } from '@/types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, addOrder } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    county: '' as KenyanCounty,
    zip: '',
    email: '',
    phone: '',
  });
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  // Kenyan counties list
  const counties: KenyanCounty[] = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Other'];

  // Standard shipping rate in KES
  const shippingRate = 500;
  // VAT rate in Kenya is 16%
  const taxRate = 0.16;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCountyChange = (value: KenyanCounty) => {
    setShippingInfo(prev => ({ ...prev, county: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping information
    const requiredFields = ['name', 'address', 'city', 'county', 'zip', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Process payment based on selected method
    processPayment();
  };

  const validateMpesaPhone = (phone: string) => {
    // Kenyan phone number validation (supports formats like 07xx, 254xxx, +254xxx)
    const kenyaPhoneRegex = /^(?:254|\+254|0)?(7[0-9]{8})$/;
    return kenyaPhoneRegex.test(phone);
  };

  const validateCardDetails = () => {
    if (!cardDetails.number || cardDetails.number.length < 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid card number",
        variant: "destructive",
      });
      return false;
    }

    if (!cardDetails.name) {
      toast({
        title: "Missing Information",
        description: "Please enter the name on the card",
        variant: "destructive",
      });
      return false;
    }

    if (!cardDetails.expiry || !cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date (MM/YY)",
        variant: "destructive",
      });
      return false;
    }

    if (!cardDetails.cvc || cardDetails.cvc.length < 3) {
      toast({
        title: "Invalid CVC",
        description: "Please enter a valid security code",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const processPayment = () => {
    setIsProcessing(true);

    if (paymentMethod === 'mpesa') {
      if (!validateMpesaPhone(mpesaPhone)) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid M-Pesa phone number",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      // Simulate M-Pesa payment processing
      setTimeout(() => {
        toast({
          title: "M-Pesa Request Sent",
          description: "Please check your phone for the M-Pesa payment prompt.",
        });
        
        // Simulate successful payment after delay
        setTimeout(() => {
          completeOrder('mpesa');
        }, 3000);
      }, 2000);
      
    } else if (paymentMethod === 'card') {
      if (!validateCardDetails()) {
        setIsProcessing(false);
        return;
      }
      
      // Simulate card processing
      setTimeout(() => {
        completeOrder('card');
      }, 2000);
    }
  };

  const completeOrder = (method: 'mpesa' | 'card') => {
    // Calculate totals
    const subtotal = cartTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingRate;

    // Create a new order
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      customerId: `CUST-${Math.floor(Math.random() * 100000)}`,
      customerName: shippingInfo.name,
      customerEmail: shippingInfo.email,
      customerPhone: shippingInfo.phone,
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        county: shippingInfo.county,
        postalCode: shippingInfo.zip
      },
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: total,
      status: 'pending' as const,
      payment: {
        method: method,
        status: 'completed' as const,
        transactionId: `TXN-${Math.floor(Math.random() * 100000)}`
      },
      sellerId: cart[0].product.sellerId, // Assuming all items are from the same seller
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add the order to the context
    if (addOrder) {
      addOrder(newOrder);
    }

    // Clear the cart
    clearCart();
    setIsProcessing(false);
    
    toast({
      title: "Payment Successful",
      description: "Your order has been placed successfully!",
    });
    
    // Redirect to order confirmation
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6 text-gray-600">Add some products to your cart before proceeding to checkout.</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  // Calculate totals in KES
  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingRate;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-600">Complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Steps */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={shippingInfo.name} 
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={shippingInfo.email} 
                      onChange={handleInputChange}
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address} 
                    onChange={handleInputChange}
                    placeholder="123 Main St" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={shippingInfo.city} 
                      onChange={handleInputChange}
                      placeholder="Nairobi" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Select onValueChange={handleCountyChange} value={shippingInfo.county}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select County" />
                      </SelectTrigger>
                      <SelectContent>
                        {counties.map((county) => (
                          <SelectItem key={county} value={county}>{county}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">Postal Code</Label>
                    <Input 
                      id="zip" 
                      name="zip" 
                      value={shippingInfo.zip} 
                      onChange={handleInputChange}
                      placeholder="00100" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={shippingInfo.phone} 
                    onChange={handleInputChange}
                    placeholder="0712 345678" 
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter your phone number (e.g. 0712345678)</p>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mpesa" onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mpesa">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>M-Pesa</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Card</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mpesa" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
                      <Input 
                        id="mpesa-phone" 
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="e.g. 0712345678" 
                      />
                      <p className="text-sm text-gray-500 mt-1">Enter your M-Pesa registered phone number</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-green-700">
                        You will receive a push notification on your phone to complete the payment.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="card" className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input 
                      id="card-number" 
                      name="number" 
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input 
                      id="card-name" 
                      name="name" 
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input 
                        id="card-expiry" 
                        name="expiry" 
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvc">CVC</Label>
                      <Input 
                        id="card-cvc" 
                        name="cvc" 
                        value={cardDetails.cvc}
                        onChange={handleCardInputChange}
                        placeholder="123" 
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/cart')}>
                Back to Cart
              </Button>
              <Button 
                onClick={handleShippingSubmit} 
                disabled={isProcessing}
                className="flex items-center"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Order
                    <ChevronsRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 bg-gray-100 rounded">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">
                      KES {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>KES {shippingRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (16%)</span>
                  <span>KES {tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-sm font-semibold mb-2">Secure Checkout</h3>
            <p className="text-xs text-gray-600">
              Your payment information is processed securely. We do not store credit card details nor have access to your payment information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
