
import { useState, useEffect } from 'react';
import { ProductConfig } from '../types/ProductConfig';
import { products } from '../config/products';

export const useProductSelection = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      // Remove dependent products
      products.forEach(product => {
        if (product.dependencies?.includes(productId)) {
          newSelected.delete(product.id);
        }
      });
    } else {
      newSelected.add(productId);
    }
    
    setSelectedProducts(newSelected);
  };

  // Auto-add dependent products
  useEffect(() => {
    const newSelected = new Set(selectedProducts);
    let changed = false;

    products.forEach(product => {
      if (product.autoAdd && product.dependencies) {
        const dependenciesMet = product.dependencies.every(dep => newSelected.has(dep));
        if (dependenciesMet && !newSelected.has(product.id)) {
          newSelected.add(product.id);
          changed = true;
        } else if (!dependenciesMet && newSelected.has(product.id)) {
          newSelected.delete(product.id);
          changed = true;
        }
      }
    });

    if (changed) {
      setSelectedProducts(newSelected);
    }
  }, [selectedProducts]);

  return {
    selectedProducts,
    handleProductToggle
  };
};
