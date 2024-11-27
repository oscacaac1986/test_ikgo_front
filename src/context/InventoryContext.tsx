import React, { createContext, useCallback, useContext, useState } from 'react';
import { inventoryApi } from '../api/inventory';
import { CreateInventoryEntryDto, CreateProductDto, Product } from '../types/inventory';

interface InventoryContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (data: CreateProductDto) => Promise<void>;
  addInventory: (data: CreateInventoryEntryDto) => Promise<void>;
  removeInventory: (productId: number, quantity: number) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: CreateProductDto) => {
    try {
      setLoading(true);
      await inventoryApi.createProduct(data);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  const addInventory = useCallback(async (data: CreateInventoryEntryDto) => {
    try {
      setLoading(true);
      await inventoryApi.addInventory(data);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError('Failed to add inventory');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  const removeInventory = useCallback(async (productId: number, quantity: number) => {
    try {
      setLoading(true);
      await inventoryApi.removeInventory({ product_id: productId, quantity });
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError('Failed to remove inventory');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  return (
    <InventoryContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        addInventory,
        removeInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export default InventoryProvider;