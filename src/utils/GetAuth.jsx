import * as GetUtils from 'utils/GetUtils';
import * as GetStorage from 'utils/GetStorage';
import * as GetDate from 'utils/GetDate';

// Key
const today = GetDate.FormatDate(GetUtils.GetByDay(), 'yyyy_MM_dd');
const AuthTokenKey = 'SECURE_TOKEN_' + today;
const AuthUserIdKey = 'SECURE_ID_' + today;
const AuthValidKey = 'SECURE_VALID_' + today;
export { AuthTokenKey, AuthUserIdKey, AuthValidKey };

// Token
export function SetStoreAuthToken(value) {
  return GetStorage.SetLocalStore(AuthTokenKey, value);
}
export function GetStoreAuthToken() {
  return GetStorage.GetLocalStore(AuthTokenKey);
}
export function RemoveStoreAuthToken() {
  return GetStorage.RemoveLocalStore(AuthTokenKey);
}

// UserId
export function SetStoreAuthUserId(value) {
  return GetStorage.SetLocalStore(AuthUserIdKey, value);
}
export function GetStoreAuthUserId() {
  return GetStorage.GetLocalStore(AuthUserIdKey);
}
export function RemoveStoreAuthUserId() {
  return GetStorage.RemoveLocalStore(AuthUserIdKey);
}

// Valid
export function SetStoreAuthValid(value) {
  return GetStorage.SetLocalStore(AuthValidKey, value);
}
export function GetStoreAuthValid() {
  return GetStorage.GetLocalStore(AuthValidKey);
}
export function RemoveStoreAuthValid() {
  return GetStorage.RemoveLocalStore(AuthValidKey);
}