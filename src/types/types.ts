export interface topSalesItem {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export interface categoryItem {
  id: number;
  title: string;
};

export interface catalogItem {
  id: number;
  title: string;
  price: number;
  images: string[];
};
export type catalogItems = catalogItem[];

export interface sizeItem {
  size: string,
  available: boolean
};

export type sizeItems = sizeItem[];

export interface productItem {
  id: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  price: number;
  sizes: sizeItems;
};

export interface CartItem {
  id: number;
  title: string;
  size: string;
  price: number;
  count: number;
};
export type CartItems = CartItem[];

export interface Owner {
  phone: string;
  address: string;
};

export type ProductID = number;
export type Size = string;

export interface Product {
  id: ProductID;
  count: number;
  price: number;
  title: string;
  size: Size;
};

export interface ProductSize {
  [key: Size]: Product;
};

export interface CartData {
  [key: ProductID]: ProductSize;
}

export interface CartState {
  data: CartData | null,
  owner: Owner
};

export interface deleteFromCartPayload {
  id: ProductID,
  size: Size
};

export type FixMeLater = any;
