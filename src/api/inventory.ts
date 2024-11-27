import axios from 'axios';
import { CreateInventoryEntryDto, CreateProductDto, Product } from '../types/inventory';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const inventoryApi = {
  getProducts: () => api.get<Product[]>('/products'),
  createProduct: (data: CreateProductDto) => api.post<Product>('/products', data),
  addInventory: (data: CreateInventoryEntryDto) => 
    api.post('/inventory/entry', data),
  removeInventory: (data: { product_id: number; quantity: number }) =>
    api.post('/inventory/exit', data),
};