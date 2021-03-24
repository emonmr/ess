import {createSelector} from '@ngrx/store';
import {selectRootState} from '../app.selector';


export const selectUserState = createSelector(
  selectRootState,
  (state) => state.userReducer
);

export const selectUserData = createSelector(selectUserState, userState => userState.data);
export const selectIsLoggedIn = createSelector(selectUserState, userState => userState.logged_in);
