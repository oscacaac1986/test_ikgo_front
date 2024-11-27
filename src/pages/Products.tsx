// src/pages/Products.tsx
import React, { useEffect, useState } from 'react';
import { Alert } from '../components/common/Alert';
import { useInventory } from '../context/InventoryContext';

const Products: React.FC = () => {
  const { products, loading, error, fetchProducts, createProduct } = useInventory();
  const [newProduct, setNewProduct] = useState({ name: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: '', description: '' });
      setSuccessMessage('Product created successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
        {error && <Alert message={error} />}
        {successMessage && <Alert message={successMessage} type="success" />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className={`p-4 rounded-lg border ${
                  product.status === 'vigente'
                    ? 'border-green-200 bg-green-50'
                    : product.status === 'por_vencer'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={
                      product.status === 'vigente'
                        ? 'text-green-700'
                        : product.status === 'por_vencer'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                    }
                  >
                    {product.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium">Total Quantity:</span> {product.total_quantity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;