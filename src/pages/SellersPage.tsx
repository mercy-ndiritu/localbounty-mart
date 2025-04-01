
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SellerCard from '@/components/SellerCard';
import { SELLERS } from '@/data/mockData';
import { SubscriptionTier } from '@/types';
import { Search } from 'lucide-react';

const SellersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [tierFilter, setTierFilter] = useState<SubscriptionTier | 'all'>('all');
  
  // Apply filters and sorting
  const filteredSellers = SELLERS.filter(seller => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by tier
    const matchesTier = tierFilter === 'all' || seller.subscriptionTier === tierFilter;
    
    return matchesSearch && matchesTier;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'products':
        return b.productCount - a.productCount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Sellers</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search sellers by name, description or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <Select
            value={tierFilter}
            onValueChange={(value) => setTierFilter(value as SubscriptionTier | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results */}
      {filteredSellers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">No sellers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map(seller => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellersPage;
