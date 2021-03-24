import {UserState} from './user.model';
import {UserActionsUnion, UserActionTypes} from './user.actions';
import {LocalStorageService} from '../../classes/localStorage';


const initialState: UserState = {
  logged_in: false,
  data: null
};

/**
 * Restore UserData From Storage
 */
const localUserData = LocalStorageService.getItem('user');
if (localUserData) {
  initialState.logged_in = true;
  initialState.data = localUserData;
} else {
  LocalStorageService.removeItem('user');
}


export function userReducer(state: UserState = initialState, action: UserActionsUnion) {
  switch (action.type) {
    case UserActionTypes.ADD_USER:
      LocalStorageService.setItem('user', action.payload);
      return {
        logged_in: true,
        data: action.payload
      };
    case UserActionTypes.REMOVE_USER:
      LocalStorageService.removeItem('user');
      return {
        logged_in: false,
        data: null
      };
    case UserActionTypes.RESTORE_USER:
      const data = LocalStorageService.getItem('user');
      state = data ? {logged_in: true, data} : {logged_in: false, data: null};
      return {...state};
    default:
      return state;
  }
}
