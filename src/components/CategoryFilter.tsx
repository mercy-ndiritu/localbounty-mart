
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductCategory } from '@/types';
import { getCategoryLabel, getCategoryIcon } from '@/data/mockData';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const categories: (ProductCategory | 'all')[] = ['all', 'groceries', 'handmade', 'farm'];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`
            ${selectedCategory === category 
              ? 'bg-market-primary hover:bg-market-dark' 
              : 'hover:bg-accent hover:text-accent-foreground'}
          `}
          onClick={() => onSelectCategory(category)}
        >
          {category !== 'all' ? (
            <>
              <span className="mr-1">{getCategoryIcon(category)}</span>
              {getCategoryLabel(category)}
            </>
          ) : (
            <>All Products</>
          )}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
