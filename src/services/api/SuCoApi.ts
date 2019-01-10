import { get, post, API_URL } from '.';
var PATH = API_URL + '/QuanLySuCo';
var PATH_ODATA = API_URL + '/odata/SuCos';

const Url = {
  LayMaSuCo: PATH + '/LayMaSuCo',
};

export async function layMaSuCo() {
  const result = await get(Url.LayMaSuCo);
  if (result.status === 200) return result.data;
  else throw 'Không thể tải mã sự cố';
}