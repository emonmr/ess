export interface ProductModel {
  id: number;
  name: string;
  price: number;
  quantity: number;
  details: string;
}

export interface ProductState {
  data: Array<ProductModel>;
}
