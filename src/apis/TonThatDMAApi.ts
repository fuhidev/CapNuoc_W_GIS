import { get, API_URL } from './api';
import * as moment from '../modules/moment';
import * as model from '../models/DMA';
var defaultPath = API_URL + '/QuanLyTonThatDMA';
const URL = {
  laySanLuongChiTiet: defaultPath + '/LayChiTietSanLuongDMA',
  layApLucChiTiet: defaultPath + '/LayChiTietApLucDMA',
  laySanLuongKhachHangTrenDMA: defaultPath + '/SelectSanLuongKhachHangTrenDMA',
  layLoggerDMA: defaultPath + '/SelectLoggerDMA',
  laySanLuong: defaultPath + '/SelectSanLuongDMA',
  danhSachSCTheoDMA: defaultPath + '/DSSCTheoDMA',
  ILI: defaultPath + '/ILI',
};

export function laySanLuong(body: {
  maDMA: string, tuNgay: Date, denNgay: Date
}) {
  const url = `${URL.laySanLuong}?maDMA=${body.maDMA}`
    + `&tuNgay=${body.tuNgay.toISOString().slice(0, 10)}`
    + `&denNgay=${body.denNgay.toISOString().slice(0, 10)}`;
  return get(url);
}
export function layDanhSachSCTheoDMA(body: {
  tuNgay: Date, denNgay: Date
}): Promise<model.SuCoTheoDMA[]> {
  const url = `${URL.danhSachSCTheoDMA}?`
    + `&tuNgay=${body.tuNgay.toISOString().slice(0, 10)}`
    + `&denNgay=${body.denNgay.toISOString().slice(0, 10)}`;
  return get(url);
}
export function layChiTietSanLuongDMA(body: {
  maDMA: string, tuNgay: Date, denNgay: Date
}) {
  const url = `${URL.laySanLuongChiTiet}?maDMA=${body.maDMA}`
    + `&tuNgay=${moment.formatyyyymmdd(body.tuNgay, '-')}`
    + `&denNgay=${moment.formatyyyymmdd(body.denNgay, '-')}`;
  return get(url);
}

export function layChiTietApLuc(body: {
  maDMA: string, tuNgay: Date, denNgay: Date
}) {
  const url = `${URL.layApLucChiTiet}?maDMA=${body.maDMA}`
    + `&tuNgay=${moment.formatyyyymmdd(body.tuNgay, '-')}`
    + `&denNgay=${moment.formatyyyymmdd(body.denNgay, '-')}`;
  return get(url);
}

export function laySanLuongKhachHangTrenDMA(body: {
  maDMA: string, nam: number, ky: number
}) {
  const url = `${URL.laySanLuongKhachHangTrenDMA}?maDMA=${body.maDMA}&nam=${body.nam}&ky=${body.ky}`;
  return get(url);
}

export function layLoggerDMA() {
  return get(URL.layLoggerDMA);
}
export function laySanLuong_1(body: {
  maDMA: string, tuNgay: string, denNgay: string
}
) {
  const url = `${URL.laySanLuong}?maDMA=${body.maDMA}&tuNgay=${body.tuNgay}&denNgay=${body.denNgay}`;
  return get(url);
}
export function ILI(body: {
  P: number
}) {
  const url = `${URL.ILI}?p=${body.P}`;
  return get(url);
}