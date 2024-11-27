// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Welcome to Inventory Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/products"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-medium text-indigo-600">Manage Products</h3>
          <p className="mt-2 text-gray-600">
            Create and view products in your inventory.
          </p>
        </Link>
        
        <Link
          to="/inventory"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-medium text-indigo-600">Manage Inventory</h3>
          <p className="mt-2 text-gray-600">
            Add or remove inventory items and track expiration dates.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;