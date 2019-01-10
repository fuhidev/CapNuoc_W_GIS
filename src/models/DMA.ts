export default interface DMA {
  MaDMA: string;
  TenDMA: string;
}
export interface TieuThuResult {
  SoLuongKH: number;
  SanLuongKH: number;
  SanLuongDMA: number;
}

export interface SuCoResult {
  TTCQ: number;
  TTKQ: number;
  SanLuongDMA: number;
  TongSuCo: number;
}

export interface ResultILI {
  CAPL: number;
  MAAPL: number;
  LM: number;
  NC: number;
  LP: number;
  P: number;
  Group: string;
  Summary: string;
  ILI: number;
}

export interface ApLuc {
  ThoiGian: string;
  GiaTri: number;
}
export interface SuCoTheoDMA {
  TenDMA: string;
  IDSuCo: string;
  DiemBe: number;
  SuaBe: number;
}