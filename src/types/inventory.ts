export interface Product {
    id: number;
    name: string;
    description: string;
    total_quantity: number;
    status: 'vigente' | 'por_vencer' | 'vencido';
    entries: InventoryEntry[];
  }
  
  export interface InventoryEntry {
    quantity: number;
    expiry_date: string;
    status: 'vigente' | 'por_vencer' | 'vencido';
  }
  
  export interface CreateProductDto {
    name: string;
    description: string;
  }
  
  export interface CreateInventoryEntryDto {
    product_id: number;
    quantity: number;
    expiry_date: string;
  }