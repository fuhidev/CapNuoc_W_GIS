export interface ThongKe {
  code: number | string;
  name: string;
  value: number;
}

export enum TrangThai {
  MoiTiepNhan = 0, HoanThanh = 3
}

export enum ThongTinPhanAnh {
  Khac, KhongNuoc, NuocDuc, NuocYeu, XiDHN, HuVan, OngBe
}

export interface KetQuaTruyVan {
  OBJECTID: number;
  IDSuCo: string;
  ViTri: string;
  SODIENTHOAI: string;
  NguoiCapNhat: string;
  NgayXayRa: number;
}

export interface VatTuSuCo {
  MaVatTu: string;
  TenVatTu: string;
  SoLuong: number;
  DonViTinh: string;
}

export enum ModelConstant {
  OBJECTID = 'OBJECTID',
  GlobalID = 'GlobalID',
  IDSuCo = 'IDSuCo',
  NguoiPhanAnh = 'NguoiPhanAnh',
  SDTPhanAnh = 'SDTPhanAnh',
  TGPhanAnh = 'TGPhanAnh',
  DoiQuanLy = 'DoiQuanLy',
  HinhThucPhatHien = 'HinhThucPhatHien',
  ThongTinPhanAnh = 'ThongTinPhanAnh',
  TGKhacPhuc = 'TGKhacPhuc',
  NhomKhacPhuc = 'NhomKhacPhuc',
  PhanLoaiSuCo = 'PhanLoaiSuCo',
  DiaChi = 'DiaChi',
  MaDuong = 'MaDuong',
  MaQuan = 'MaQuan',
  MaPhuong = 'MaPhuong',
  MaDMA = 'MaDMA',
  LoaiSuCo = 'LoaiSuCo',
  VatLieu = 'VatLieu',
  NguyenNhan = 'NguyenNhan',
  DuongKinhOng = 'DuongKinhOng',
  ApLuc = 'ApLuc',
  DoSauLungOng = 'DoSauLungOng',
  GhiChu = 'GhiChu',
  created_user = 'created_user',
  created_date = 'created_date',
  last_edited_user = 'last_edited_user',
  last_edited_date = 'last_edited_date',
  TrangThai = 'TrangThai'
}

export interface Model {
  OBJECTID?: number;
  GlobalID?: string;
  IDSuCo?: string;
  NguoiPhanAnh?: string;
  SDTPhanAnh?: string;
  TGPhanAnh?: number;
  DoiQuanLy?: string;
  HinhThucPhatHien?: number;
  ThongTinPhanAnh?: number;
  TGKhacPhuc?: number;
  NhomKhacPhuc?: string;
  PhanLoaiSuCo?: number;
  DiaChi?: string;
  MaDuong?: string;
  MaQuan?: string;
  MaPhuong?: string;
  MaDMA?: string;
  LoaiSuCo?: number;
  VatLieu?: number;
  NguyenNhan?: string;
  DuongKinhOng?: number;
  ApLuc?: number;
  DoSauLungOng?: number;
  GhiChu?: string;
  created_user?: string;
  created_date?: number;
  last_edited_user?: string;
  last_edited_date?: number;
  TrangThai?: number;
}

export const COLORS = ['#e10808', '#009c10', '#f0e91d'];

export const SEARCH_OUTFIELDS = ['OBJECTID', 'TrangThai', 'IDSuCo', 'DiaChi', 'SDTPhanAnh', 'TGPhanAnh'];