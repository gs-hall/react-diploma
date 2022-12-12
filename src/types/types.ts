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

export type FixMeLater = any;
