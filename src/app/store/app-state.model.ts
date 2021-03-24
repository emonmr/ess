import {UserState} from './user/user.model';
import {ProductState} from './product/product.model';

export interface AppState {
  userReducer: UserState;
  productReducer: ProductState;
}
