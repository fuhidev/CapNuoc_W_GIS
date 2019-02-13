// export const API_URL = '//ninhthuan.ditagis.com/api';
import { API_URL } from '../../appconfig';
export { API_URL } from '../../appconfig'
import fetch from '../../helpers/fetch';
import Auth from '../../modules/Auth';
const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

export const odata = {
  get: async (url: string, body?: BodyInit) => {
    const result = await get(url, body);
    if (result.status === 200) return result.data.value;
    throw new Error(result.data);
  },
  post: async (url: string, body?: BodyInit) => {
    const result = await post(url, body);
    if (result.status === 201) return result.data;
    else throw new Error(result.data);
  },
  put: async (url: string, body?: BodyInit) => {
    const result = await put(url, body);
    if (result.status === 204) return result.data;
    else throw new Error(result.data);
  },
  patch: async (url: string, body?: BodyInit) => {
    const result = await patch(url, body);
    if (result.status === 200) return result.data;
    else throw new Error(result.data);
  },
  delete: async (url: string) => {
    const result = await _delete(url);
    if (result.status === 204) return true;
    else throw new Error(result.data);
  }
}

export function post(url: string, body?: BodyInit) {
  pushAuthorizeToHeader();
  return fetch(url, {
    method: 'POST',
    body, headers
  });
}
export async function get(url: string, body?: BodyInit) {
  pushAuthorizeToHeader();
  return fetch(url, {
    method: 'GET',
    body,
    headers
  });
}
export function put(url: string, body?: BodyInit) {
  pushAuthorizeToHeader();
  return fetch(url, {
    method: 'PUT', body, headers
  });
}
export function patch(url: string, body?: BodyInit) {
  pushAuthorizeToHeader();
  return fetch(url, {
    method: 'PATCH', body, headers
  });
}

export function _delete(url: string) {
  pushAuthorizeToHeader();
  return fetch(url, { method: 'DELETE', headers });
}
export async function profile(): Promise<any> {
  var url = API_URL + '/Account/Profile';
  return get(url);
}

function pushAuthorizeToHeader() {
  if (Auth.isUserAuthenticated()) {
    if (headers.get('Authorization')) // nếu có giá trị rồi thì xóa gán lại
    { headers.delete('Authorization'); }
    headers.append('Authorization', Auth.getToken() as string);
  } else {
    Auth.deauthenticateUser();
    location.href = '/login';
  }
}