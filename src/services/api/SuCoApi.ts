import { get, post, API_URL } from '.';
import fetch from '../../helpers/fetch';
var PATH = API_URL + '/QuanLySuCo';
var PATH_ODATA = API_URL + '/odata/SuCos';

const Url = {
  LayMaSuCo: PATH + '/LayMaSuCo',
};

export async function layMaSuCo(doiQuanLy: string = 'QLCN1') {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const result = await fetch(Url.LayMaSuCo + '/' + doiQuanLy, { method: 'GET', headers });
  if (result.status === 200) { return result.data; }
  else { throw 'Không thể tải mã sự cố'; }
}