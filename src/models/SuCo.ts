export interface ThongKe {
  code: number;
  name: string;
  value: number;
}

export enum TrangThai {
  'CHUA_SUA', 'DA_SUA' = 3
}

export interface KetQuaTruyVan {
  OBJECTID: number;
  IDSuCo: string;
  DiaChi: string;
  SDTPhanAnh: string;
  NguoiPhanAnh: string;
  TGPhanAnh: number;
  NhomKhacPhuc: string;
}


export interface ThongTinKhachHangMatNuoc {
  OBJECTID: number;
  DBDONGHONUOC: string;
  TENTHUEBAO: string;
  SONHA: string;
  MADUONG: string;
  MAPHUONG: string;
  MAQUAN: string;
  CODONGHO: string;
  SDTPhanAnh: string;
  TENDMA: string;
  TENDUONG: string;
  NGAYCAPNHAT: string;
  TuNgay: string;
  DenNgay: string;
}


export enum ThongTinPhanAnh {
  Khac, KhongNuoc, NuocDuc, NuocYeu, XiDHN, HuVan, OngBe
}

export const DEFAULT_DEF = 'TrangThai <> ' + TrangThai.DA_SUA;