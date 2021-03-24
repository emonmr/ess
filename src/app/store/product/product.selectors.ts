import {createSelector} from '@ngrx/store';
import {selectRootState} from '../app.selector';


export const selectProductState = createSelector(
  selectRootState,
  (state) => state.productReducer
);

export const selectProductData = createSelector(selectProductState, productState => productState.data);
