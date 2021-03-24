export interface UserInfoModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jwtToken: string;
}


export interface UserState {
  logged_in: boolean;
  data: null | UserInfoModel;
}
