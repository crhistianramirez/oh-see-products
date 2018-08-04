import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import * as cookies from 'js-cookie';
const defaultClient = OrderCloudSDK.ApiClient.instance;
const oauth2 = defaultClient.authentications['oauth2'];

// set methods for interacting with token
const authTokenCookieName = 'ordercloud_accessToken';
const _setToken = (token) => {
    oauth2.accessToken = token;
    cookies.set(authTokenCookieName, token);
}
const _getToken = () => {
    var token = cookies.get(authTokenCookieName);
    oauth2.accessToken = token;
    return token;
}
const _removeToken = () => {
    oauth2.accessToken = null;
    cookies.remove(authTokenCookieName);
}

// return configured sdk with additional token methods added
OrderCloudSDK.SetToken = _setToken;
OrderCloudSDK.GetToken = _getToken;
OrderCloudSDK.RemoveToken = _removeToken;
export { OrderCloudSDK }