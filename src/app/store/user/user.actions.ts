import {Action} from '@ngrx/store';
import {UserInfoModel} from './user.model';



export const enum UserActionTypes {
  ADD_USER = 'Add User',
  REMOVE_USER = 'Remove User',
  RESTORE_USER = 'Restore User',
}

class AddUser implements Action {
  readonly type = UserActionTypes.ADD_USER;

  constructor(public payload: UserInfoModel) {
  }
}

class RestoreUser implements Action {
  readonly type = UserActionTypes.RESTORE_USER;
}

class RemoveUser implements Action {
  readonly type = UserActionTypes.REMOVE_USER;
}


export type UserActionsUnion = AddUser  | RemoveUser | RestoreUser;

export const UserActions = {AddUser, RemoveUser, RestoreUser};
