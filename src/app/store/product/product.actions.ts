import {Action} from '@ngrx/store';
import {ProductModel} from './product.model';



export const enum ProductActionTypes {
  ADD_PRODUCT = 'Add Product',
  REMOVE_PRODUCT = 'Remove Product',
  RESTORE_PRODUCT = 'Restore Product',
}

class AddProduct implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT;

  constructor(public payload: ProductModel[]) {
  }
}

class RemoveProduct implements Action {
  readonly type = ProductActionTypes.REMOVE_PRODUCT;
}

class RestoreProduct implements Action {
  readonly type = ProductActionTypes.RESTORE_PRODUCT;
}


export type ProductActionsUnion = AddProduct  | RemoveProduct | RestoreProduct;

export const ProductActions = {AddProduct, RemoveProduct, RestoreProduct};
