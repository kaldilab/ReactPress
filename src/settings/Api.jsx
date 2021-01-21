import WPAPI from 'wpapi';
import * as GetAuth from 'utils/GetAuth';

const ApiUrl = (process.env.NODE_ENV === 'production') ? 'YOUR_DOMAIN_URL' : 'localhost:PORT';
const Api = new WPAPI({ endpoint: 'http://' + ApiUrl + '/wp-json' });
export default Api;

export function ApiAuth() {
  return Api.setHeaders('Authorization', 'Bearer ' + GetAuth.GetStoreAuthToken());
}

export function ApiAuthToken() {
  Api.AuthToken = Api.registerRoute('jwt-auth/v1', '/token');
  return Api.AuthToken();
}

export function ApiAuthValid() {
  Api.AuthValid = Api.registerRoute('jwt-auth/v1/token', '/validate');
  return Api.AuthValid().setHeaders('Authorization', 'Bearer ' + GetAuth.GetStoreAuthToken());
}

export function ApiCPT(cptSlug) {
  Api.CustomPostType = Api.registerRoute('wp/v2', '/cpt_' + cptSlug + '/(?P<id>)');
  return Api.CustomPostType();
}