export interface Product {
  _id?: string;
  code: Number;
  barcode: string;
  status: string;
  imported_t: string;
  url: string;
  product_name: string;
  quantity: string;
  categories: [string];
  packaging: [string];
  brands: [string];
  image_url: string;
}
