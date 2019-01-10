import { post, API_URL } from './api';
var defaultPath = API_URL + '/QuanLySanLuong';
const URL_API = {
  laySanLuong: defaultPath + '/SelectSanLuong',
  laySanLuongTheoKy: defaultPath + '/SelectXepHangSanLuongTheoKy',
  laySanLuongTheoNam: defaultPath + '/SelectSanLuongNam'
};

export function laySanLuong(body: {
  nam: number, ky: number, gioiHanSoLuong?: number, tieuThuTu?: number, tieuThuDen?: number,
  chiSoTu?: number, chiSoDen?: number, giaBieuTu?: number, giaBieuDen?: number
}) {
  const url = URL_API.laySanLuong +
    `?nam=${body.nam}&ky=${body.ky}&gioiHanSoLuong=${body.gioiHanSoLuong || 100}`
    + `&tieuThuTu=${body.tieuThuTu !== undefined ? body.tieuThuTu : null}`
    + `&tieuThuDen=${body.tieuThuDen !== undefined ? body.tieuThuDen : null}`
    + `&chiSoTu=${body.chiSoTu !== undefined ? body.chiSoTu : null}`
    + `&chiSoDen=${body.chiSoDen !== undefined ? body.chiSoDen : null}`
    + `&giaBieuTu=${body.giaBieuTu !== undefined ? body.giaBieuTu : null}`
    + `&giaBieuDen=${body.giaBieuDen !== undefined ? body.giaBieuDen : null}`;
  return post(url);
}
export function xepHangSanLuongTheoKy(body: {
  nam: number, ky: number, gioiHanSoLuong?: number
}) {
  const url = URL_API.laySanLuongTheoKy + `?nam=${body.nam}&ky=${body.ky}&gioiHanSoLuong=${body.gioiHanSoLuong || 100}`;
  return post(url);
}
export function laySanLuongTheoNam(body: {
  danhBa: '-1'
}) {
  const url = `${URL_API.laySanLuongTheoNam}?danhBa=${body.danhBa}`;
  return post(url);
}