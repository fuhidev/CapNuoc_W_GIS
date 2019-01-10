// export const API_URL = '//ninhthuan.ditagis.com/api';
import { API_URL } from '../../appconfig';
export { API_URL } from '../../appconfig'
import fetch from '../../helpers/fetch';

export function post(url: string, body?: BodyInit) {
  return fetch(url, {
    method: 'POST',
    body,
  });
}
export async function get(url: string, body?: BodyInit) {
  return fetch(url, {
    method: 'GET',
    body
  });
}
export function put(url: string,body?:BodyInit) {
  return fetch(url, {
    method: 'PUT',body
  });
}

export function _delete(url: string) {
  return fetch(url, { method: 'DELETE' });
}
export async function profile(): Promise<any> {
  var url = API_URL + '/Account/Profile';
  return get(url);
}