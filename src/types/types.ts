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

export type FixMeLater = any;
