import { get, put, API_URL, post } from './api';
var defaultPath = API_URL + '/QuanLySuCo';
const URL_API = {
  taoID: defaultPath + '/GenerateIDSuCo',
  layVatTuTheoSuCo: defaultPath + '/SelectMaterialsBySuCo',
  thongTinKhachHangMatNuoc: defaultPath + '/CustomersByDMA',
  hoSoVatTu: defaultPath + '/HoSoVatTuSuCo',
  vatTu: defaultPath + '/VatTu',
  inPhieuCongTac: defaultPath + '/inphieucongtac',
  tiepNhanSuCo: defaultPath + '/TiepNhanSuCo',
  hintNhomKhacPhuc: defaultPath + '/HintNhomKhacPhuc',
  getDistinctNhomKhacPhuc: defaultPath + '/GetDistinctNhomKhacPhuc',
};

export function taoID(doiQuanLy: string) {
  return get(URL_API.taoID + `/${doiQuanLy || 'qlcn1'}`);
}
export function thongTinKhachHangMatNuoc(dma: string, tuNgay: number, denNgay: number) {
  const url = URL_API.thongTinKhachHangMatNuoc + `?dma=${dma}`
    + `&tu=${tuNgay}`
    + `&den=${denNgay}`
    ;
  return get(url);
}

export function inPhieuCongTac(IDSuCo: string) {
  const url = URL_API.inPhieuCongTac + '?idSuCo=' + IDSuCo;
  return url;
}

export function tiepNhanSuCo(objectId: number): Promise<string> {
  const url = URL_API.tiepNhanSuCo + '/' + objectId;
  return post(url);
}
export function hintNhomKhacPhuc(nhomKhacPhuc: string): Promise<string> {
  const url = URL_API.hintNhomKhacPhuc + '/' + nhomKhacPhuc;
  return get(url);
}
export function getDistinctNhomKhacPhuc(): Promise<string[]> {
  const url = URL_API.getDistinctNhomKhacPhuc;
  return get(url);
}