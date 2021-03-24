import {LocalStorageService} from '../../classes/localStorage';
import {ProductState} from './product.model';
import {ProductActionsUnion, ProductActionTypes} from './product.actions';
import {UserActionTypes} from '../user/user.actions';


const initialState: ProductState = {
  data: []
};

/**
 * Restore UserData From Storage
 */
const localProductData = LocalStorageService.getItem('product');
if (localProductData) {
  initialState.data = localProductData;
} else {
  LocalStorageService.removeItem('product');
}


export function productReducer(state: ProductState = initialState, action: ProductActionsUnion) {
  switch (action.type) {
    case ProductActionTypes.ADD_PRODUCT:
      LocalStorageService.setItem('product', action.payload);
      return {
        data: action.payload
      };
    case ProductActionTypes.REMOVE_PRODUCT:
      LocalStorageService.removeItem('product');
      return {
        data: []
      };
    case ProductActionTypes.RESTORE_PRODUCT:
      const data = LocalStorageService.getItem('product');
      state = data ? {data} : {data: []};
      return {...state};

    default:
      return state;
  }
}
